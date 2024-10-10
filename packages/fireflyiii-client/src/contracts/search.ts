import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AccountArray } from '../schema/account';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
} from '../schema/error-response';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

export const searchContract = c.router({
  searchAccounts: {
    method: 'GET',
    path: '/v1/search/accounts',
    summary: 'Search for accounts',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      query: z.string(),
      type: z
        .enum([
          'all',
          'asset',
          'cash',
          'expense',
          'revenue',
          'special',
          'hidden',
          'liability',
          'liabilities',
          'Default account',
          'Cash account',
          'Asset account',
          'Expense account',
          'Revenue account',
          'Initial balance account',
          'Beneficiary account',
          'Import account',
          'Reconciliation account',
          'Loan',
          'Debt',
          'Mortgage',
        ])
        .optional(),
      field: z.enum(['all', 'iban', 'name', 'number', 'id']),
    }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AccountArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  searchTransactions: {
    method: 'GET',
    path: '/v1/search/transactions',
    summary: 'Search for transactions',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional(), query: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});
