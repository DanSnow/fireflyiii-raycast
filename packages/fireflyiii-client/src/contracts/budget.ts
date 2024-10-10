import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AttachmentArray } from '../schema/attachment';
import { BudgetSpent } from '../schema/budget';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { Meta } from '../schema/meta';
import { TransactionArray } from '../schema/transaction';
import { budgetLimitContract } from './budget-limit';

const c = initContract();

const AutoBudgetType = z.enum(['reset', 'rollover', 'none', 'null']).nullish();
const AutoBudgetPeriod = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'half-year', 'yearly', 'null']).nullish();
const Budget = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    name: z.string(),
    active: z.boolean().optional(),
    notes: z.string().nullish(),
    order: z.number().int().optional(),
    auto_budget_type: AutoBudgetType.optional(),
    auto_budget_currency_id: z.string().nullish(),
    auto_budget_currency_code: z.string().nullish(),
    auto_budget_amount: z.string().nullish(),
    auto_budget_period: AutoBudgetPeriod.optional(),
    spent: z.array(BudgetSpent).optional(),
  })
  .passthrough();
const BudgetRead = z.object({ type: z.string(), id: z.string(), attributes: Budget }).passthrough();
const BudgetArray = z.object({ data: z.array(BudgetRead), meta: Meta }).passthrough();
const BudgetSingle = z.object({ data: BudgetRead }).passthrough();

const BudgetStore = z
  .object({
    name: z.string(),
    active: z.boolean().optional(),
    order: z.number().int().optional(),
    notes: z.string().nullish(),
    auto_budget_type: AutoBudgetType.optional(),
    auto_budget_currency_id: z.string().nullish(),
    auto_budget_currency_code: z.string().nullish(),
    auto_budget_amount: z.string().nullish(),
    auto_budget_period: AutoBudgetPeriod.optional(),
  })
  .passthrough();
const BudgetUpdate = z
  .object({
    name: z.string(),
    active: z.boolean().optional(),
    order: z.number().int().optional(),
    notes: z.string().nullish(),
    auto_budget_type: AutoBudgetType.optional(),
    auto_budget_currency_id: z.string().nullish(),
    auto_budget_currency_code: z.string().nullish(),
    auto_budget_amount: z.string().nullish(),
    auto_budget_period: AutoBudgetPeriod.optional(),
  })
  .passthrough();

export const budgetContract = c.router({
  budgetLimit: budgetLimitContract,
  listTransactionByBudget: {
    method: 'GET',
    path: '/v1/budgets/:id/transactions',
    summary: 'All transactions to a budget.',
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
  listAttachmentByBudget: {
    method: 'GET',
    path: '/v1/budgets/:id/attachments',
    summary: 'Lists all attachments of a budget.',
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
  listBudget: {
    method: 'GET',
    path: '/v1/budgets',
    summary: 'List all budgets.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeBudget: {
    method: 'POST',
    path: '/v1/budgets',
    summary: 'Store a new budget',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: BudgetStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getBudget: {
    method: 'GET',
    path: '/v1/budgets/:id',
    summary: 'Get a single budget.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string().optional(), end: z.string().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateBudget: {
    method: 'PUT',
    path: '/v1/budgets/:id',
    summary: 'Update existing budget.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: BudgetUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BudgetSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteBudget: {
    method: 'DELETE',
    path: '/v1/budgets/:id',
    summary: 'Delete a budget.',
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
