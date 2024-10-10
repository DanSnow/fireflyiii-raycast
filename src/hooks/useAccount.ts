import type { AccountTypeFilter } from 'fireflyiii-client';
import type { z } from 'zod';
import { useCachedPromise } from '@raycast/utils';
import { useAtomValue } from 'jotai';
import { clientAtom } from '../atoms/client';

export function useAccounts(type: z.infer<typeof AccountTypeFilter>) {
  const client = useAtomValue(clientAtom);
  const { data: accounts } = useCachedPromise(
    async (type: z.infer<typeof AccountTypeFilter>) => {
      const res = await client.account.listAccount({
        query: {
          type,
        },
      });
      if (res.status !== 200) {
        throw new Error('Failed to fetch accounts');
      }
      return res.body.data.map((account) => ({
        id: account.id,
        title: account.attributes.name,
        value: account.id,
      }));
    },
    [type],
  );
  return accounts;
}
