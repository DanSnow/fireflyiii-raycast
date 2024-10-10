import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AccountArray } from '../schema/account';
import { AvailableBudgetArray } from '../schema/available-budget';
import { BillArray } from '../schema/budget';
import { BudgetLimitArray } from '../schema/budget-limit';
import { CurrencyArray, CurrencyRead } from '../schema/currency';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { RecurrenceArray } from '../schema/recurrence';
import { RuleArray } from '../schema/rule';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const CurrencySingle = z.object({ data: CurrencyRead }).passthrough();
const CurrencyStore = z
  .object({
    enabled: z.boolean().optional().default(true),
    default: z.boolean().optional(),
    code: z.string(),
    name: z.string(),
    symbol: z.string(),
    decimal_places: z.number().int().optional(),
  })
  .passthrough();
const CurrencyUpdate = z
  .object({
    enabled: z.boolean().optional(),
    default: z.literal(true).optional(),
    code: z.string().optional(),
    name: z.string().optional(),
    symbol: z.string().optional(),
    decimal_places: z.number().int().optional(),
  })
  .passthrough();

export const currencyContract = c.router({
  listAccountByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/accounts',
    summary: 'List all accounts with this currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      date: z.string().optional(),
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
    }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AccountArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listAvailableBudgetByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/available-budgets',
    summary: 'List all available budgets with this currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AvailableBudgetArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listBillByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/bills',
    summary: 'List all bills with this currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BillArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listBudgetLimitByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/budget_limits',
    summary: 'List all budget limits with this currency',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetLimitArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listRecurrenceByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/recurrences',
    summary: 'List all recurring transactions with this currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RecurrenceArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listRuleByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/rules',
    summary: 'List all rules with this currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listTransactionByCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code/transactions',
    summary: 'List all transactions with this currency.',
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
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listCurrency: {
    method: 'GET',
    path: '/v1/currencies',
    summary: 'List all currencies.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CurrencyArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeCurrency: {
    method: 'POST',
    path: '/v1/currencies',
    summary: 'Store a new currency',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: CurrencyStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CurrencySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  enableCurrency: {
    method: 'POST',
    path: '/v1/currencies/:code/enable',
    summary: 'Enable a single currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ code: z.string() }),
    body: z.void(),
    responses: {
      204: c.otherResponse({ contentType: 'application/vnd.api+json', body: CurrencySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  disableCurrency: {
    method: 'POST',
    path: '/v1/currencies/:code/disable',
    summary: 'Disable a currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ code: z.string() }),
    body: z.void(),
    responses: {
      204: c.otherResponse({ contentType: 'application/vnd.api+json', body: CurrencySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      409: z.void(),
      500: InternalExceptionResponse,
    },
  },
  defaultCurrency: {
    method: 'POST',
    path: '/v1/currencies/:code/default',
    summary: 'Make currency default currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ code: z.string() }),
    body: z.void(),
    responses: {
      204: c.otherResponse({ contentType: 'application/vnd.api+json', body: CurrencySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getCurrency: {
    method: 'GET',
    path: '/v1/currencies/:code',
    summary: 'Get a single currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ code: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CurrencySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateCurrency: {
    method: 'PUT',
    path: '/v1/currencies/:code',
    summary: 'Update existing currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ code: z.string() }),
    body: CurrencyUpdate,
    contentType: 'application/json',
    responses: {
      200: CurrencySingle,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteCurrency: {
    method: 'DELETE',
    path: '/v1/currencies/:code',
    summary: 'Delete a currency.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ code: z.string() }),
    body: z.void(),
    responses: {
      204: z.void(),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getDefaultCurrency: {
    method: 'GET',
    path: '/v1/currencies/default',
    summary: "Get the user's default currency.",
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    responses: {
      200: CurrencySingle,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});
