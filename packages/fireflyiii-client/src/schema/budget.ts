import { z } from 'zod';
import { Meta } from './meta';

export const BudgetSpent = z
  .object({
    sum: z.string().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
  })
  .passthrough();

export const BillRepeatFrequency = z.enum(['weekly', 'monthly', 'quarterly', 'half-year', 'yearly']);
export const Bill = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    name: z.string(),
    amount_min: z.string(),
    amount_max: z.string(),
    date: z.string().datetime({ offset: true }),
    end_date: z.string().datetime({ offset: true }).nullish(),
    extension_date: z.string().datetime({ offset: true }).nullish(),
    repeat_freq: BillRepeatFrequency,
    skip: z.number().int().optional(),
    active: z.boolean().optional(),
    order: z.number().int().optional(),
    notes: z.string().nullish(),
    next_expected_match: z.string().datetime({ offset: true }).nullish(),
    next_expected_match_diff: z.string().nullish(),
    object_group_id: z.string().nullish(),
    object_group_order: z.number().int().nullish(),
    object_group_title: z.string().nullish(),
    pay_dates: z.array(z.string().datetime({ offset: true })).optional(),
    paid_dates: z
      .array(
        z
          .object({
            transaction_group_id: z.string().optional(),
            transaction_journal_id: z.string().optional(),
            date: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
      )
      .optional(),
  })
  .passthrough();
export const BillRead = z.object({ type: z.string(), id: z.string(), attributes: Bill }).passthrough();
export const BillArray = z.object({ data: z.array(BillRead), meta: Meta }).passthrough();
