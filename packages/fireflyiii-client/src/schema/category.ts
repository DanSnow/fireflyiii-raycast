import { z } from 'zod';
import { Meta } from './meta';

export const CategorySpent = z
  .object({
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    sum: z.string().optional(),
  })
  .passthrough();
export const CategoryEarned = z
  .object({
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    sum: z.string().optional(),
  })
  .passthrough();
export const Category = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    name: z.string(),
    notes: z.string().nullish(),
    spent: z.array(CategorySpent).optional(),
    earned: z.array(CategoryEarned).optional(),
  })
  .passthrough();
export const CategoryRead = z.object({ type: z.string(), id: z.string(), attributes: Category }).passthrough();
export const CategoryArray = z.object({ data: z.array(CategoryRead), meta: Meta }).passthrough();
