import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AttachmentArray } from '../schema/attachment';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { TagArray, TagRead } from '../schema/tag';
import { TransactionArray } from '../schema/transaction';

const TagSingle = z.object({ data: TagRead }).passthrough();
const TagModelStore = z
  .object({
    tag: z.string(),
    date: z.string().nullish(),
    description: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
  })
  .passthrough();
const TagModelUpdate = z
  .object({
    tag: z.string().optional(),
    date: z.string().nullish(),
    description: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
  })
  .passthrough();

const c = initContract();

export const tagContract = c.router({
  listAttachmentByTag: {
    method: 'GET',
    path: '/v1/tags/:tag/attachments',
    summary: 'Lists all attachments.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ tag: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AttachmentArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listTransactionByTag: {
    method: 'GET',
    path: '/v1/tags/:tag/transactions',
    summary: 'List all transactions with this tag.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
      type: z
        .enum([
          'all',
          'withdrawal',
          'withdrawals',
          'expense',
          'deposit',
          'deposits',
          'income',
          'transfer',
          'transfers',
          'opening_balance',
          'reconciliation',
          'special',
          'specials',
          'default',
        ])
        .optional(),
    }),
    pathParams: z.object({ tag: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listTag: {
    method: 'GET',
    path: '/v1/tags',
    summary: 'List all tags.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TagArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeTag: {
    method: 'POST',
    path: '/v1/tags',
    summary: 'Store a new tag',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: TagModelStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TagSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getTag: {
    method: 'GET',
    path: '/v1/tags/:tag',
    summary: 'Get a single tag.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ tag: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TagSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateTag: {
    method: 'PUT',
    path: '/v1/tags/:tag',
    summary: 'Update existing tag.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ tag: z.string() }),
    body: TagModelUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TagSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteTag: {
    method: 'DELETE',
    path: '/v1/tags/:tag',
    summary: 'Delete an tag.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ tag: z.string() }),
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
