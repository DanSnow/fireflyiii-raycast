import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const PiggyBank = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    account_id: z.string(),
    account_name: z.string().optional(),
    name: z.string(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    target_amount: z.string().nullable(),
    percentage: z.number().nullish(),
    current_amount: z.string().optional(),
    left_to_save: z.string().nullish(),
    save_per_month: z.string().nullish(),
    start_date: z.string().optional(),
    target_date: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    object_group_id: z.string().nullish(),
    object_group_order: z.number().int().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();
export const PiggyBankRead = z
  .object({ type: z.string(), id: z.string(), attributes: PiggyBank, links: ObjectLink })
  .passthrough();
export const PiggyBankArray = z.object({ data: z.array(PiggyBankRead), meta: Meta, links: PageLink }).passthrough();

export const PiggyBankEvent = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    amount: z.string().optional(),
    transaction_journal_id: z.string().nullish(),
    transaction_group_id: z.string().nullish(),
  })
  .passthrough();
export const PiggyBankEventRead = z
  .object({ type: z.string(), id: z.string(), attributes: PiggyBankEvent, links: ObjectLink })
  .passthrough();
export const PiggyBankEventArray = z
  .object({ data: z.array(PiggyBankEventRead), meta: Meta, links: PageLink })
  .passthrough();
