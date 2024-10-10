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
  RecurrenceArray,
  RecurrenceRead,
  RecurrenceRepetitionType,
  RecurrenceTransactionType,
} from '../schema/recurrence';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const RecurrenceSingle = z.object({ data: RecurrenceRead }).passthrough();
const RecurrenceRepetitionStore = z
  .object({
    type: RecurrenceRepetitionType,
    moment: z.string(),
    skip: z.number().int().optional(),
    weekend: z.number().int().optional(),
  })
  .passthrough();
const RecurrenceTransactionStore = z
  .object({
    description: z.string(),
    amount: z.string(),
    foreign_amount: z.string().nullish(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    foreign_currency_id: z.string().nullish(),
    foreign_currency_code: z.string().nullish(),
    budget_id: z.string().optional(),
    category_id: z.string().optional(),
    source_id: z.string(),
    destination_id: z.string(),
    tags: z.array(z.string()).nullish(),
    piggy_bank_id: z.string().nullish(),
    bill_id: z.string().nullish(),
  })
  .passthrough();
const RecurrenceStore = z
  .object({
    type: RecurrenceTransactionType,
    title: z.string(),
    description: z.string().optional(),
    first_date: z.string(),
    repeat_until: z.string().nullable(),
    nr_of_repetitions: z.number().int().nullish(),
    apply_rules: z.boolean().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    repetitions: z.array(RecurrenceRepetitionStore),
    transactions: z.array(RecurrenceTransactionStore),
  })
  .passthrough();
const RecurrenceRepetitionUpdate = z
  .object({
    type: RecurrenceRepetitionType.optional(),
    moment: z.string().optional(),
    skip: z.number().int().optional(),
    weekend: z.number().int().optional(),
  })
  .passthrough();
const RecurrenceTransactionUpdate = z
  .object({
    id: z.string(),
    description: z.string().optional(),
    amount: z.string().optional(),
    foreign_amount: z.string().nullish(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    foreign_currency_id: z.string().nullish(),
    budget_id: z.string().optional(),
    category_id: z.string().optional(),
    source_id: z.string().optional(),
    destination_id: z.string().optional(),
    tags: z.array(z.string()).nullish(),
    piggy_bank_id: z.string().nullish(),
    bill_id: z.string().nullish(),
  })
  .passthrough();
const RecurrenceUpdate = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    first_date: z.string().optional(),
    repeat_until: z.string().nullish(),
    nr_of_repetitions: z.number().int().nullish(),
    apply_rules: z.boolean().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    repetitions: z.array(RecurrenceRepetitionUpdate).optional(),
    transactions: z.array(RecurrenceTransactionUpdate).optional(),
  })
  .passthrough();

export const recurrenceContract = c.router({
  listTransactionByRecurrence: {
    method: 'GET',
    path: '/v1/recurrences/:id/transactions',
    summary: 'List all transactions created by a recurring transaction.',
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
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listRecurrence: {
    method: 'GET',
    path: '/v1/recurrences',
    summary: 'List all recurring transactions.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RecurrenceArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeRecurrence: {
    method: 'POST',
    path: '/v1/recurrences',
    summary: 'Store a new recurring transaction',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: RecurrenceStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RecurrenceSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getRecurrence: {
    method: 'GET',
    path: '/v1/recurrences/:id',
    summary: 'Get a single recurring transaction.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RecurrenceSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateRecurrence: {
    method: 'PUT',
    path: '/v1/recurrences/:id',
    summary: 'Update existing recurring transaction.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: RecurrenceUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RecurrenceSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteRecurrence: {
    method: 'DELETE',
    path: '/v1/recurrences/:id',
    summary: 'Delete a recurring transaction.',
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
