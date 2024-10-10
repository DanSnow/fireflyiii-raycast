import { z } from 'zod';
import { Meta } from './meta';

export const BudgetLimit = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    start: z.string().datetime({ offset: true }),
    end: z.string().datetime({ offset: true }),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_name: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    budget_id: z.string(),
    period: z.string().nullish(),
    amount: z.string(),
    spent: z.string().nullish(),
  })
  .passthrough();
export const BudgetLimitRead = z.object({ type: z.string(), id: z.string(), attributes: BudgetLimit }).passthrough();
export const BudgetLimitArray = z.object({ data: z.array(BudgetLimitRead), meta: Meta }).passthrough();
