import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const Currency = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    enabled: z.boolean().optional().default(true),
    default: z.boolean().optional(),
    code: z.string(),
    name: z.string(),
    symbol: z.string(),
    decimal_places: z.number().int().optional(),
  })
  .passthrough();
export const CurrencyRead = z.object({ type: z.string(), id: z.string(), attributes: Currency }).passthrough();
export const CurrencyArray = z.object({ data: z.array(CurrencyRead), meta: Meta, links: PageLink }).passthrough();
