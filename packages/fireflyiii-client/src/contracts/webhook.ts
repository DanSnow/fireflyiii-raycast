import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import {
  WebhookArray,
  WebhookAttemptArray,
  WebhookAttemptRead,
  WebhookDelivery,
  WebhookMessageArray,
  WebhookMessageRead,
  WebhookRead,
  WebhookResponse,
  WebhookTrigger,
} from '../schema/webhook';

const c = initContract();

const WebhookAttemptSingle = z.object({ data: WebhookAttemptRead }).passthrough();
const WebhookMessageSingle = z.object({ data: WebhookMessageRead }).passthrough();
const WebhookSingle = z.object({ data: WebhookRead }).passthrough();
const WebhookStore = z
  .object({
    active: z.boolean().optional(),
    title: z.string(),
    trigger: WebhookTrigger,
    response: WebhookResponse,
    delivery: WebhookDelivery,
    url: z.string(),
  })
  .passthrough();
const WebhookUpdate = z
  .object({
    active: z.boolean().optional(),
    title: z.string().optional(),
    secret: z.string().optional(),
    trigger: WebhookTrigger.optional(),
    response: WebhookResponse.optional(),
    delivery: WebhookDelivery.optional(),
    url: z.string().optional(),
  })
  .passthrough();

export const webhookContract = c.router({
  getWebhookMessages: {
    method: 'GET',
    path: '/v1/webhooks/:id/messages',
    summary: 'Get all the messages of a single webhook.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookMessageArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getSingleWebhookMessage: {
    method: 'GET',
    path: '/v1/webhooks/:id/messages/:messageId',
    summary: 'Get a single message from a webhook.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), messageId: z.number().int() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookMessageSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteWebhookMessage: {
    method: 'DELETE',
    path: '/v1/webhooks/:id/messages/:messageId',
    summary: 'Delete a webhook message.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), messageId: z.number().int() }),
    body: z.void(),
    responses: {
      204: z.void(),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getWebhookMessageAttempts: {
    method: 'GET',
    path: '/v1/webhooks/:id/messages/:messageId/attempts',
    summary: 'Get all the failed attempts of a single webhook message.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string(), messageId: z.number().int() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookAttemptArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getSingleWebhookMessageAttempt: {
    method: 'GET',
    path: '/v1/webhooks/:id/messages/:messageId/attempts/:attemptId',
    summary: 'Get a single failed attempt from a single webhook message.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), messageId: z.number().int(), attemptId: z.number().int() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookAttemptSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteWebhookMessageAttempt: {
    method: 'DELETE',
    path: '/v1/webhooks/:id/messages/:messageId/attempts/:attemptId',
    summary: 'Delete a webhook attempt.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), messageId: z.number().int(), attemptId: z.number().int() }),
    body: z.void(),
    responses: {
      204: z.void(),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  submitWebook: {
    method: 'POST',
    path: '/v1/webhooks/:id/submit',
    summary: 'Submit messages for a webhook.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: z.void(),
    responses: { 200: z.void(), 204: z.void(), 404: z.void(), 500: z.void() },
  },
  triggerTransactionWebhook: {
    method: 'POST',
    path: '/v1/webhooks/:id/trigger-transaction/:transactionId',
    summary: 'Trigger webhook for a given transaction.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), transactionId: z.string() }),
    body: z.void(),
    responses: { 204: z.void(), 404: z.void(), 500: z.void() },
  },
  listWebhook: {
    method: 'GET',
    path: '/v1/webhooks',
    summary: 'List all webhooks.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeWebhook: {
    method: 'POST',
    path: '/v1/webhooks',
    summary: 'Store a new webhook',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: WebhookStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getWebhook: {
    method: 'GET',
    path: '/v1/webhooks/:id',
    summary: 'Get a single webhook.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateWebhook: {
    method: 'PUT',
    path: '/v1/webhooks/:id',
    summary: 'Update existing webhook.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: WebhookUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: WebhookSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteWebhook: {
    method: 'DELETE',
    path: '/v1/webhooks/:id',
    summary: 'Delete a webhook.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: z.void(),
    responses: {
      204: z.void(),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});
