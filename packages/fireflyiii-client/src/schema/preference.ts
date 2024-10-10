import { z } from 'zod';
import { PolymorphicProperty } from './configuration';
import { Meta, PageLink } from './meta';

export const Preference = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    name: z.string(),
    data: PolymorphicProperty,
  })
  .passthrough();
export const PreferenceRead = z.object({ type: z.string(), id: z.string(), attributes: Preference }).passthrough();
export const PreferenceArray = z.object({ data: z.array(PreferenceRead), meta: Meta, links: PageLink }).passthrough();
