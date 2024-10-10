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
import { PiggyBankArray, PiggyBankEventArray, PiggyBankRead } from '../schema/piggy-bank';

const c = initContract();

const PiggyBankSingle = z.object({ data: PiggyBankRead }).passthrough();
const PiggyBankStore = z
  .object({
    name: z.string(),
    account_id: z.string(),
    target_amount: z.string().nullable(),
    current_amount: z.string().optional(),
    start_date: z.string().optional(),
    target_date: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    object_group_id: z.string().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();
const PiggyBankUpdate = z
  .object({
    name: z.string().optional(),
    account_id: z.string().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    target_amount: z.string().nullish(),
    current_amount: z.string().optional(),
    start_date: z.string().optional(),
    target_date: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    object_group_id: z.string().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();

export const piggyBankContract = c.router({
  listEventByPiggyBank: {
    method: 'GET',
    path: '/v1/piggy-banks/:id/events',
    summary: 'List all events linked to a piggy bank.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PiggyBankEventArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listAttachmentByPiggyBank: {
    method: 'GET',
    path: '/v1/piggy-banks/:id/attachments',
    summary: 'Lists all attachments.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AttachmentArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listPiggyBank: {
    method: 'GET',
    path: '/v1/piggy-banks',
    summary: 'List all piggy banks.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PiggyBankArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storePiggyBank: {
    method: 'POST',
    path: '/v1/piggy-banks',
    summary: 'Store a new piggy bank',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: PiggyBankStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PiggyBankSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getPiggyBank: {
    method: 'GET',
    path: '/v1/piggy-banks/:id',
    summary: 'Get a single piggy bank.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PiggyBankSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updatePiggyBank: {
    method: 'PUT',
    path: '/v1/piggy-banks/:id',
    summary: 'Update existing piggy bank.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: PiggyBankUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PiggyBankSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deletePiggyBank: {
    method: 'DELETE',
    path: '/v1/piggy-banks/:id',
    summary: 'Delete a piggy bank.',
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
