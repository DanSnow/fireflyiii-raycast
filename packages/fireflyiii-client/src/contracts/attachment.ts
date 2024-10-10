import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AttachableType, AttachmentArray, AttachmentRead } from '../schema/attachment';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';

const c = initContract();

const AttachmentSingle = z.object({ data: AttachmentRead }).passthrough();
const AttachmentStore = z
  .object({
    filename: z.string(),
    attachable_type: AttachableType,
    attachable_id: z.string(),
    title: z.string().optional(),
    notes: z.string().nullish(),
  })
  .passthrough();
const AttachmentUpdate = z
  .object({ filename: z.string().optional(), title: z.string().optional(), notes: z.string().nullish() })
  .passthrough();

export const attachmentContract = c.router({
  listAttachment: {
    method: 'GET',
    path: '/v1/attachments',
    summary: 'List all attachments.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AttachmentArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeAttachment: {
    method: 'POST',
    path: '/v1/attachments',
    summary: 'Store a new attachment.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: AttachmentStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AttachmentSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getAttachment: {
    method: 'GET',
    path: '/v1/attachments/:id',
    summary: 'Get a single attachment.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AttachmentSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateAttachment: {
    method: 'PUT',
    path: '/v1/attachments/:id',
    summary: 'Update existing attachment.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: AttachmentUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AttachmentSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteAttachment: {
    method: 'DELETE',
    path: '/v1/attachments/:id',
    summary: 'Delete an attachment.',
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
