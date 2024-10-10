import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const RuleGroup = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    title: z.string(),
    description: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
  })
  .passthrough();
export const RuleGroupRead = z
  .object({ type: z.string(), id: z.string(), attributes: RuleGroup, links: ObjectLink })
  .passthrough();
export const RuleGroupArray = z.object({ data: z.array(RuleGroupRead), meta: Meta, links: PageLink }).passthrough();
