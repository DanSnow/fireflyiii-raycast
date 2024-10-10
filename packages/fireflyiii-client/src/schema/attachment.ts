import { z } from 'zod';
import { Meta, ObjectLink } from './meta';

export const AttachableType = z.enum(['Account', 'Budget', 'Bill', 'TransactionJournal', 'PiggyBank', 'Tag']);
export const Attachment = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    attachable_type: AttachableType,
    attachable_id: z.string(),
    md5: z.string().optional(),
    filename: z.string(),
    download_url: z.string().optional(),
    upload_url: z.string().optional(),
    title: z.string().nullish(),
    notes: z.string().nullish(),
    mime: z.string().optional(),
    size: z.number().int().optional(),
  })
  .passthrough();
export const AttachmentRead = z
  .object({ type: z.string(), id: z.string(), attributes: Attachment, links: ObjectLink })
  .passthrough();
export const AttachmentArray = z.object({ data: z.array(AttachmentRead), meta: Meta }).passthrough();
