import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
} from '../schema/error-response';

import { TransactionSingle } from '../schema/transaction';
import { TransactionLinkArray } from '../schema/transaction-link';

const c = initContract();

export const transactionJournalContract = c.router({
  listLinksByJournal: {
    method: 'GET',
    path: '/v1/transaction-journals/:id/links',
    summary: 'Lists all the transaction links for an individual journal (individual split).',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionLinkArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getTransactionByJournal: {
    method: 'GET',
    path: '/v1/transaction-journals/:id',
    summary: 'Get a single transaction, based on one of the underlying transaction journals (transaction splits).',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteTransactionJournal: {
    method: 'DELETE',
    path: '/v1/transaction-journals/:id',
    summary: 'Delete split from transaction',
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
