import { z } from 'zod';

export const BadRequestResponse = z
  .object({ message: z.string().optional(), exception: z.string().optional() })
  .passthrough();
export const InternalExceptionResponse = z
  .object({ message: z.string().optional(), exception: z.string().optional() })
  .passthrough();
export const NotFoundResponse = z
  .object({ message: z.string().optional(), exception: z.string().optional() })
  .passthrough();
export const UnauthenticatedResponse = z
  .object({ message: z.string().optional(), exception: z.string().optional() })
  .passthrough();
export const ValidationErrorResponse = z
  .object({
    message: z.string().optional(),
    errors: z
      .object({
        email: z.array(z.string()).optional(),
        blocked: z.array(z.string()).optional(),
        role: z.array(z.string()).optional(),
        blocked_code: z.array(z.string()).optional(),
        name: z.array(z.string()).optional(),
        type: z.array(z.string()).optional(),
        iban: z.array(z.string()).optional(),
        start: z.array(z.string()).optional(),
        end: z.array(z.string()).optional(),
        date: z.array(z.string()).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
