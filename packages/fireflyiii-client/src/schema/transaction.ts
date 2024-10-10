import { z } from 'zod';
import { AccountTypeProperty } from './account';
import { Meta, ObjectLink, PageLink } from './meta';

export const TransactionTypeProperty = z.enum([
  'withdrawal',
  'deposit',
  'transfer',
  'reconciliation',
  'opening balance',
]);

export const TransactionSplit = z
  .object({
    user: z.string().optional(),
    transaction_journal_id: z.string().optional(),
    type: TransactionTypeProperty,
    date: z.string().datetime({ offset: true }),
    order: z.number().int().nullish(),
    currency_id: z.string().nullish(),
    currency_code: z.string().nullish(),
    currency_symbol: z.string().optional(),
    currency_name: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    foreign_currency_id: z.string().nullish(),
    foreign_currency_code: z.string().nullish(),
    foreign_currency_symbol: z.string().nullish(),
    foreign_currency_decimal_places: z.number().int().nullish(),
    amount: z.string(),
    foreign_amount: z.string().nullish(),
    description: z.string(),
    source_id: z.string().nullable(),
    source_name: z.string().nullish(),
    source_iban: z.string().nullish(),
    source_type: AccountTypeProperty.optional(),
    destination_id: z.string().nullable(),
    destination_name: z.string().nullish(),
    destination_iban: z.string().nullish(),
    destination_type: AccountTypeProperty.optional(),
    budget_id: z.string().nullish(),
    budget_name: z.string().nullish(),
    category_id: z.string().nullish(),
    category_name: z.string().nullish(),
    bill_id: z.string().nullish(),
    bill_name: z.string().nullish(),
    reconciled: z.boolean().optional(),
    notes: z.string().nullish(),
    tags: z.array(z.string()).nullish(),
    internal_reference: z.string().nullish(),
    external_id: z.string().nullish(),
    external_url: z.string().nullish(),
    original_source: z.string().nullish(),
    recurrence_id: z.string().nullish(),
    recurrence_total: z.number().int().nullish(),
    recurrence_count: z.number().int().nullish(),
    bunq_payment_id: z.string().nullish(),
    import_hash_v2: z.string().nullish(),
    sepa_cc: z.string().nullish(),
    sepa_ct_op: z.string().nullish(),
    sepa_ct_id: z.string().nullish(),
    sepa_db: z.string().nullish(),
    sepa_country: z.string().nullish(),
    sepa_ep: z.string().nullish(),
    sepa_ci: z.string().nullish(),
    sepa_batch_id: z.string().nullish(),
    interest_date: z.string().datetime({ offset: true }).nullish(),
    book_date: z.string().datetime({ offset: true }).nullish(),
    process_date: z.string().datetime({ offset: true }).nullish(),
    due_date: z.string().datetime({ offset: true }).nullish(),
    payment_date: z.string().datetime({ offset: true }).nullish(),
    invoice_date: z.string().datetime({ offset: true }).nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
    has_attachments: z.boolean().optional(),
  })
  .passthrough();

export const Transaction = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    user: z.string().optional(),
    group_title: z.string().nullish(),
    transactions: z.array(TransactionSplit),
  })
  .passthrough();
export const TransactionRead = z
  .object({ type: z.string(), id: z.string(), attributes: Transaction, links: ObjectLink })
  .passthrough();
export const TransactionArray = z.object({ data: z.array(TransactionRead), meta: Meta, links: PageLink }).passthrough();

export const TransactionSingle = z.object({ data: TransactionRead }).passthrough();
