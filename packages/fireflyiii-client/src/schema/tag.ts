import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const TagModel = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    tag: z.string(),
    date: z.string().nullish(),
    description: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
  })
  .passthrough();
export const TagRead = z
  .object({ type: z.string(), id: z.string(), attributes: TagModel, links: ObjectLink })
  .passthrough();
export const TagArray = z.object({ data: z.array(TagRead), meta: Meta, links: PageLink }).passthrough();
