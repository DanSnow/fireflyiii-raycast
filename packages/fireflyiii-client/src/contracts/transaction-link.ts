import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { TransactionLinkArray, TransactionLinkRead } from '../schema/transaction-link';

const c = initContract();

const TransactionLinkSingle = z.object({ data: TransactionLinkRead }).passthrough();
const TransactionLinkStore = z
  .object({
    link_type_id: z.string(),
    link_type_name: z.string().optional(),
    inward_id: z.string(),
    outward_id: z.string(),
    notes: z.string().nullish(),
  })
  .passthrough();
const TransactionLinkUpdate = z
  .object({
    link_type_id: z.string().optional(),
    link_type_name: z.string().optional(),
    inward_id: z.string().optional(),
    outward_id: z.string().optional(),
    notes: z.string().nullish(),
  })
  .passthrough();

export const transactionLinkContract = c.router({
  listTransactionLink: {
    method: 'GET',
    path: '/v1/transaction-links',
    summary: 'List all transaction links.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionLinkArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeTransactionLink: {
    method: 'POST',
    path: '/v1/transaction-links',
    summary: 'Create a new link between transactions',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: TransactionLinkStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionLinkSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getTransactionLink: {
    method: 'GET',
    path: '/v1/transaction-links/:id',
    summary: 'Get a single link.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionLinkSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteTransactionLink: {
    method: 'DELETE',
    path: '/v1/transaction-links/:id',
    summary: 'Permanently delete link between transactions.',
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
  updateTransactionLink: {
    method: 'PUT',
    path: '/v1/transaction-links/:id',
    summary: 'Update an existing link between transactions.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: TransactionLinkUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionLinkSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
});
