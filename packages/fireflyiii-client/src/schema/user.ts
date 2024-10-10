import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const UserBlockedCodeProperty = z.enum(['email_changed', 'null']).nullish();
export const UserRoleProperty = z.enum(['owner', 'demo', 'null']).nullish();
export const User = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    email: z.string().email(),
    blocked: z.boolean().optional(),
    blocked_code: UserBlockedCodeProperty.optional(),
    role: UserRoleProperty.optional(),
  })
  .passthrough();
export const UserRead = z
  .object({ type: z.string(), id: z.string(), attributes: User, links: ObjectLink })
  .passthrough();
export const UserArray = z.object({ data: z.array(UserRead), meta: Meta, links: PageLink }).passthrough();
export const UserSingle = z.object({ data: UserRead }).passthrough();
