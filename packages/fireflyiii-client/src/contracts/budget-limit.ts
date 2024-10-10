import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { BudgetLimit, BudgetLimitArray, BudgetLimitRead } from '../schema/budget-limit';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const BudgetLimitSingle = z.object({ data: BudgetLimitRead }).passthrough();

const BudgetLimitStore = z
  .object({
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    budget_id: z.string(),
    start: z.string(),
    period: z.string().nullish(),
    end: z.string(),
    amount: z.string(),
  })
  .passthrough();

export const budgetLimitContract = c.router({
  listTransactionByBudgetLimit: {
    method: 'GET',
    path: '/v1/budgets/:id/limits/:limitId/transactions',
    summary: 'List all transactions by a budget limit ID.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
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
    pathParams: z.object({ id: z.string(), limitId: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: TransactionArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listBudgetLimitByBudget: {
    method: 'GET',
    path: '/v1/budgets/:id/limits',
    summary: 'Get all limits for a budget.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string().optional(), end: z.string().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetLimitArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeBudgetLimit: {
    method: 'POST',
    path: '/v1/budgets/:id/limits',
    summary: 'Store new budget limit.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: BudgetLimitStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetLimitSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getBudgetLimit: {
    method: 'GET',
    path: '/v1/budgets/:id/limits/:limitId',
    summary: 'Get single budget limit.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), limitId: z.number().int().gte(1) }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetLimitSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateBudgetLimit: {
    method: 'PUT',
    path: '/v1/budgets/:id/limits/:limitId',
    summary: 'Update existing budget limit.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), limitId: z.string() }),
    body: BudgetLimit,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetLimitSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteBudgetLimit: {
    method: 'DELETE',
    path: '/v1/budgets/:id/limits/:limitId',
    summary: 'Delete a budget limit.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string(), limitId: z.string() }),
    body: z.void(),
    responses: {
      204: z.void(),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listBudgetLimit: {
    method: 'GET',
    path: '/v1/budget-limits',
    summary: 'Get list of budget limits by date',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string(), end: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetLimitArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});
