import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const WebhookTrigger = z.enum(['STORE_TRANSACTION', 'UPDATE_TRANSACTION', 'DESTROY_TRANSACTION']);
export const WebhookResponse = z.enum(['TRANSACTIONS', 'ACCOUNTS', 'NONE']);
export const WebhookDelivery = z.literal('JSON');
export const Webhook = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    active: z.boolean().optional(),
    title: z.string(),
    secret: z.string().optional(),
    trigger: WebhookTrigger,
    response: WebhookResponse,
    delivery: WebhookDelivery,
    url: z.string(),
  })
  .passthrough();
export const WebhookRead = z
  .object({ type: z.string(), id: z.string(), attributes: Webhook, links: ObjectLink })
  .passthrough();
export const WebhookArray = z.object({ data: z.array(WebhookRead), meta: Meta, links: PageLink }).passthrough();
export const WebhookAttempt = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    webhook_message_id: z.string().optional(),
    status_code: z.number().int().nullish(),
    logs: z.string().nullish(),
    response: z.string().nullish(),
  })
  .passthrough();
export const WebhookAttemptRead = z
  .object({ type: z.string(), id: z.string(), attributes: WebhookAttempt })
  .passthrough();
export const WebhookAttemptArray = z.object({ data: z.array(WebhookAttemptRead), meta: Meta }).passthrough();
export const WebhookMessage = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    sent: z.boolean().optional(),
    errored: z.boolean().optional(),
    webhook_id: z.string().optional(),
    uuid: z.string().optional(),
    message: z.string().nullish(),
  })
  .passthrough();
export const WebhookMessageRead = z
  .object({ type: z.string(), id: z.string(), attributes: WebhookMessage })
  .passthrough();
export const WebhookMessageArray = z.object({ data: z.array(WebhookMessageRead), meta: Meta }).passthrough();
