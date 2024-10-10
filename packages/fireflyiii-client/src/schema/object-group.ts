import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const ObjectGroup = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    title: z.string(),
    order: z.number().int(),
  })
  .passthrough();
export const ObjectGroupRead = z.object({ type: z.string(), id: z.string(), attributes: ObjectGroup }).passthrough();
export const ObjectGroupArray = z.object({ data: z.array(ObjectGroupRead), meta: Meta }).passthrough();
