import { z } from 'zod';
import { AccountTypeProperty } from './account';
import { Meta, ObjectLink, PageLink } from './meta';

export const RecurrenceTransactionType = z.enum(['withdrawal', 'transfer', 'deposit']);
export const RecurrenceRepetitionType = z.enum(['daily', 'weekly', 'ndom', 'monthly', 'yearly']);
export const RecurrenceRepetition = z
  .object({
    id: z.string().optional(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    type: RecurrenceRepetitionType,
    moment: z.string(),
    skip: z.number().int().optional(),
    weekend: z.number().int().optional(),
    description: z.string().optional(),
    occurrences: z.array(z.string().datetime({ offset: true })).optional(),
  })
  .passthrough();
export const RecurrenceTransaction = z
  .object({
    id: z.string().optional(),
    description: z.string(),
    amount: z.string(),
    foreign_amount: z.string().nullish(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    foreign_currency_id: z.string().nullish(),
    foreign_currency_code: z.string().nullish(),
    foreign_currency_symbol: z.string().nullish(),
    foreign_currency_decimal_places: z.number().int().nullish(),
    budget_id: z.string().optional(),
    budget_name: z.string().nullish(),
    category_id: z.string().optional(),
    category_name: z.string().optional(),
    source_id: z.string().optional(),
    source_name: z.string().optional(),
    source_iban: z.string().nullish(),
    source_type: AccountTypeProperty.optional(),
    destination_id: z.string().optional(),
    destination_name: z.string().optional(),
    destination_iban: z.string().nullish(),
    destination_type: AccountTypeProperty.optional(),
    tags: z.array(z.string()).nullish(),
    piggy_bank_id: z.string().nullish(),
    piggy_bank_name: z.string().nullish(),
    bill_id: z.string().nullish(),
    bill_name: z.string().nullish(),
  })
  .passthrough();
export const Recurrence = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    type: RecurrenceTransactionType.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    first_date: z.string().optional(),
    latest_date: z.string().nullish(),
    repeat_until: z.string().nullish(),
    nr_of_repetitions: z.number().int().nullish(),
    apply_rules: z.boolean().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    repetitions: z.array(RecurrenceRepetition).optional(),
    transactions: z.array(RecurrenceTransaction).optional(),
  })
  .passthrough();
export const RecurrenceRead = z
  .object({ type: z.string(), id: z.string(), attributes: Recurrence, links: ObjectLink })
  .passthrough();
export const RecurrenceArray = z.object({ data: z.array(RecurrenceRead), meta: Meta, links: PageLink }).passthrough();
