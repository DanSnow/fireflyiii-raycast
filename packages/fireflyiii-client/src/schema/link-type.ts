import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const LinkType = z
  .object({ name: z.string(), inward: z.string(), outward: z.string(), editable: z.boolean().optional() })
  .passthrough();
export const LinkTypeRead = z
  .object({ type: z.string(), id: z.string(), attributes: LinkType, links: ObjectLink })
  .passthrough();
export const LinkTypeArray = z.object({ data: z.array(LinkTypeRead), meta: Meta, links: PageLink }).passthrough();
