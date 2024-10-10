import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const TransactionLink = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    link_type_id: z.string(),
    link_type_name: z.string().optional(),
    inward_id: z.string(),
    outward_id: z.string(),
    notes: z.string().nullish(),
  })
  .passthrough();
export const TransactionLinkRead = z
  .object({ type: z.string(), id: z.string(), attributes: TransactionLink, links: ObjectLink })
  .passthrough();
export const TransactionLinkArray = z
  .object({ data: z.array(TransactionLinkRead), meta: Meta, links: PageLink })
  .passthrough();
