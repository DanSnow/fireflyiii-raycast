import type { AccountTypeFilter, TransactionTypeProperty } from 'fireflyiii-client';
import type { z } from 'zod';
import { Action, ActionPanel, Form, showToast } from '@raycast/api';
import { FormValidation, useCachedPromise, useForm } from '@raycast/utils';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { clientAtom } from '../atoms/client';
import { useAccounts } from '../hooks/useAccount';

interface Values {
  source: string;
  target: string;
  description: string;
  amount: string;
}

export interface TransactionFormProps {
  type: z.infer<typeof TransactionTypeProperty>;
  text: string;
  sourceAccountType: z.infer<typeof AccountTypeFilter>;
  targetAccountType: z.infer<typeof AccountTypeFilter>;
}

export function TransactionForm({ type, text, sourceAccountType, targetAccountType }: TransactionFormProps) {
  const client = useAtomValue(clientAtom);
  const [description, setDescription] = useState('');
  const { data: descriptionAutoComplete } = useCachedPromise(
    async (input: string) => {
      const res = await client.autocomplete.getTransactionsAc({
        query: {
          query: input,
        },
      });

      if (res.status !== 200) {
        return [input];
      }
      return [...res.body.map((transaction) => transaction.name), input];
    },
    [description],
    { initialData: [description] },
  );

  const sourceAccounts = useAccounts(sourceAccountType);
  const targetAccounts = useAccounts(targetAccountType);

  const { handleSubmit, itemProps } = useForm<Values>({
    validation: {
      description: FormValidation.Required,
      source: FormValidation.Required,
      target: FormValidation.Required,
      amount: (value) => {
        if (!value) {
          return 'This is required field';
        }

        if (Number.isNaN(Number.parseInt(value))) {
          return 'Must be number';
        }
      },
    },
    onSubmit: async (values) => {
      const res = await client.transaction.storeTransaction({
        body: {
          transactions: [
            {
              type,
              amount: values.amount,
              description: values.description,
              date: new Date().toISOString(),
              source_id: values.source,
              destination_id: values.target,
            },
          ],
        },
      });
      if (res.status === 200) {
        showToast({ title: 'Success', message: 'Transaction created' });
      } else {
        console.error(res);
        showToast({
          title: 'Failed',
          message: 'Fail to create transaction',
        });
      }
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text={text} />
      <Form.Dropdown
        title="Description"
        placeholder="Transaction description"
        throttle
        onSearchTextChange={setDescription}
        {...itemProps.description}
      >
        {descriptionAutoComplete?.map((name) => <Form.Dropdown.Item key={name} title={name} value={name} />)}
      </Form.Dropdown>
      <Form.Dropdown title="Source account" {...itemProps.source}>
        {sourceAccounts?.map((account) => <Form.Dropdown.Item key={account.id} {...account} />)}
      </Form.Dropdown>
      <Form.Dropdown title="Target account" {...itemProps.target}>
        {targetAccounts?.map((account) => <Form.Dropdown.Item key={account.id} {...account} />)}
      </Form.Dropdown>
      <Form.TextField title="Amount" {...itemProps.amount} />
    </Form>
  );
}
