import { z } from 'zod';

export const Meta = z
  .object({
    pagination: z
      .object({
        total: z.number().int().optional(),
        count: z.number().int().optional(),
        per_page: z.number().int().optional(),
        current_page: z.number().int().optional(),
        total_pages: z.number().int().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const PageLink = z
  .object({
    self: z.string().url().optional(),
    first: z.string().url().optional(),
    next: z.string().url().nullish(),
    prev: z.string().url().nullish(),
    last: z.string().url().optional(),
  })
  .passthrough();

export const ObjectLink = z
  .object({
    '0': z.object({ rel: z.string().optional(), uri: z.string().optional() }).passthrough().optional(),
    self: z.string().url().optional(),
  })
  .passthrough();
