import { z } from 'zod';
import { BudgetSpent } from './budget';
import { Meta } from './meta';

export const AvailableBudget = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    amount: z.string(),
    start: z.string().datetime({ offset: true }),
    end: z.string().datetime({ offset: true }),
    spent_in_budgets: z.array(BudgetSpent).optional(),
    spent_outside_budget: z.array(BudgetSpent).optional(),
  })
  .passthrough();
export const AvailableBudgetRead = z
  .object({ type: z.string(), id: z.string(), attributes: AvailableBudget })
  .passthrough();
export const AvailableBudgetArray = z.object({ data: z.array(AvailableBudgetRead), meta: Meta }).passthrough();
