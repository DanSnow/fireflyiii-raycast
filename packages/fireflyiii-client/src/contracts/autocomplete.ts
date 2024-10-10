import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
} from '../schema/error-response';

const c = initContract();

const AccountTypeFilter = z.enum([
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
]);
const TransactionTypeFilter = z.enum([
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
]);

const AutocompleteAccount = z
  .object({
    id: z.string(),
    name: z.string(),
    name_with_balance: z.string(),
    type: z.string(),
    currency_id: z.string(),
    currency_name: z.string(),
    currency_code: z.string(),
    currency_symbol: z.string(),
    currency_decimal_places: z.number().int(),
  })
  .passthrough();
const AutocompleteAccountArray = z.array(AutocompleteAccount);
const AutocompleteBill = z.object({ id: z.string(), name: z.string(), active: z.boolean().optional() }).passthrough();
const AutocompleteBillArray = z.array(AutocompleteBill);
const AutocompleteBudget = z.object({ id: z.string(), name: z.string() }).passthrough();
const AutocompleteBudgetArray = z.array(AutocompleteBudget);
const AutocompleteCategory = z.object({ id: z.string(), name: z.string() }).passthrough();
const AutocompleteCategoryArray = z.array(AutocompleteCategory);
const AutocompleteCurrency = z
  .object({ id: z.string(), name: z.string(), code: z.string(), symbol: z.string(), decimal_places: z.number().int() })
  .passthrough();
const AutocompleteCurrencyArray = z.array(AutocompleteCurrency);
const AutocompleteCurrencyCode = z
  .object({ id: z.string(), name: z.string(), code: z.string(), symbol: z.string(), decimal_places: z.number().int() })
  .passthrough();
const AutocompleteCurrencyCodeArray = z.array(AutocompleteCurrencyCode);
const AutocompleteObjectGroup = z.object({ id: z.string(), title: z.string(), name: z.string() }).passthrough();
const AutocompleteObjectGroupArray = z.array(AutocompleteObjectGroup);
const AutocompletePiggy = z
  .object({
    id: z.string(),
    name: z.string(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_name: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    object_group_id: z.string().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();
const AutocompletePiggyArray = z.array(AutocompletePiggy);
const AutocompletePiggyBalance = z
  .object({
    id: z.string(),
    name: z.string(),
    name_with_balance: z.string().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    object_group_id: z.string().nullish(),
    object_group_title: z.string().nullish(),
  })
  .passthrough();
const AutocompletePiggyBalanceArray = z.array(AutocompletePiggyBalance);
const AutocompleteRecurrence = z
  .object({ id: z.string(), name: z.string(), description: z.string().optional() })
  .passthrough();
const AutocompleteRecurrenceArray = z.array(AutocompleteRecurrence);
const AutocompleteRule = z
  .object({ id: z.string(), name: z.string(), description: z.string().optional() })
  .passthrough();
const AutocompleteRuleArray = z.array(AutocompleteRule);
const AutocompleteRuleGroup = z
  .object({ id: z.string(), name: z.string(), description: z.string().optional() })
  .passthrough();
const AutocompleteRuleGroupArray = z.array(AutocompleteRuleGroup);
const AutocompleteTag = z.object({ id: z.string(), name: z.string(), tag: z.string() }).passthrough();
const AutocompleteTagArray = z.array(AutocompleteTag);
const AutocompleteTransaction = z
  .object({ id: z.string(), transaction_group_id: z.string().optional(), name: z.string(), description: z.string() })
  .passthrough();
const AutocompleteTransactionArray = z.array(AutocompleteTransaction);
const AutocompleteTransactionID = z
  .object({ id: z.string(), transaction_group_id: z.string().optional(), name: z.string(), description: z.string() })
  .passthrough();
const AutocompleteTransactionIDArray = z.array(AutocompleteTransactionID);
const AutocompleteTransactionType = z.object({ id: z.string(), name: z.string(), type: z.string() }).passthrough();
const AutocompleteTransactionTypeArray = z.array(AutocompleteTransactionType);

export const autoCompleteContract = c.router({
  getAccountsAc: {
    method: 'GET',
    path: '/v1/autocomplete/accounts',
    summary: 'Returns all accounts of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      query: z.string().optional(),
      limit: z.number().int().optional(),
      date: z.string().optional(),
      types: z.array(AccountTypeFilter).optional(),
    }),
    responses: {
      200: AutocompleteAccountArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getBillsAc: {
    method: 'GET',
    path: '/v1/autocomplete/bills',
    summary: 'Returns all bills of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteBillArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getBudgetsAc: {
    method: 'GET',
    path: '/v1/autocomplete/budgets',
    summary: 'Returns all budgets of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteBudgetArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getCategoriesAc: {
    method: 'GET',
    path: '/v1/autocomplete/categories',
    summary: 'Returns all categories of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteCategoryArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getCurrenciesAc: {
    method: 'GET',
    path: '/v1/autocomplete/currencies',
    summary: 'Returns all currencies of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteCurrencyArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getCurrenciesCodeAc: {
    method: 'GET',
    path: '/v1/autocomplete/currencies-with-code',
    summary:
      'Returns all currencies of the user returned in a basic auto-complete array. This endpoint is DEPRECATED and I suggest you DO NOT use it.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteCurrencyCodeArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getObjectGroupsAc: {
    method: 'GET',
    path: '/v1/autocomplete/object-groups',
    summary: 'Returns all object groups of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteObjectGroupArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getPiggiesAc: {
    method: 'GET',
    path: '/v1/autocomplete/piggy-banks',
    summary: 'Returns all piggy banks of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompletePiggyArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getPiggiesBalanceAc: {
    method: 'GET',
    path: '/v1/autocomplete/piggy-banks-with-balance',
    summary:
      'Returns all piggy banks of the user returned in a basic auto-complete array complemented with balance information.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompletePiggyBalanceArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getRecurringAc: {
    method: 'GET',
    path: '/v1/autocomplete/recurring',
    summary: 'Returns all recurring transactions of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteRecurrenceArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getRuleGroupsAc: {
    method: 'GET',
    path: '/v1/autocomplete/rule-groups',
    summary: 'Returns all rule groups of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteRuleGroupArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getRulesAc: {
    method: 'GET',
    path: '/v1/autocomplete/rules',
    summary: 'Returns all rules of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteRuleArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getTagAc: {
    method: 'GET',
    path: '/v1/autocomplete/tags',
    summary: 'Returns all tags of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteTagArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getTransactionTypesAc: {
    method: 'GET',
    path: '/v1/autocomplete/transaction-types',
    summary: 'Returns all transaction types returned in a basic auto-complete array. English only.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteTransactionTypeArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getTransactionsAc: {
    method: 'GET',
    path: '/v1/autocomplete/transactions',
    summary: 'Returns all transaction descriptions of the user returned in a basic auto-complete array.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteTransactionArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getTransactionsIdac: {
    method: 'GET',
    path: '/v1/autocomplete/transactions-with-id',
    summary:
      'Returns all transactions, complemented with their ID, of the user returned in a basic auto-complete array. This endpoint is DEPRECATED and I suggest you DO NOT use it.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ query: z.string().optional(), limit: z.number().int().optional() }),
    responses: {
      200: AutocompleteTransactionIDArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});
