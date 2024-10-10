import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AttachmentArray } from '../schema/attachment';
import { BillArray, BillRead, BillRepeatFrequency } from '../schema/budget';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { RuleArray } from '../schema/rule';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const BillSingle = z.object({ data: BillRead }).passthrough();

const BillStore = z
  .object({
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    name: z.string(),
    amount_min: z.string(),
    amount_max: z.string(),
    date: z.string().datetime({ offset: true }),
    end_date: z.string().datetime({ offset: true }).optional(),
    extension_date: z.string().datetime({ offset: true }).optional(),
    repeat_freq: BillRepeatFrequency,
    skip: z.number().int().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    object_group_id: z.string().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();
const BillUpdate = z
  .object({
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    name: z.string(),
    amount_min: z.string().optional(),
    amount_max: z.string().optional(),
    date: z.string().datetime({ offset: true }).optional(),
    end_date: z.string().datetime({ offset: true }).optional(),
    extension_date: z.string().datetime({ offset: true }).optional(),
    repeat_freq: BillRepeatFrequency.optional(),
    skip: z.number().int().optional(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    object_group_id: z.string().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();

export const billContract = c.router({
  listAttachmentByBill: {
    method: 'GET',
    path: '/v1/bills/:id/attachments',
    summary: 'List all attachments uploaded to the bill.',
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
  listRuleByBill: {
    method: 'GET',
    path: '/v1/bills/:id/rules',
    summary: 'List all rules associated with the bill.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listTransactionByBill: {
    method: 'GET',
    path: '/v1/bills/:id/transactions',
    summary: 'List all transactions associated with the  bill.',
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
  listBill: {
    method: 'GET',
    path: '/v1/bills',
    summary: 'List all bills.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BillArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeBill: {
    method: 'POST',
    path: '/v1/bills',
    summary: 'Store a new bill',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: BillStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BillSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getBill: {
    method: 'GET',
    path: '/v1/bills/:id',
    summary: 'Get a single bill.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string().optional(), end: z.string().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BillSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateBill: {
    method: 'PUT',
    path: '/v1/bills/:id',
    summary: 'Update existing bill.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: BillUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BillSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteBill: {
    method: 'DELETE',
    path: '/v1/bills/:id',
    summary: 'Delete a bill.',
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
