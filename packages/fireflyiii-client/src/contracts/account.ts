import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  AccountArray,
  AccountRead,
  AccountRoleProperty,
  AccountTypeFilter,
  CreditCardTypeProperty,
  InterestPeriodProperty,
  LiabilityDirectionProperty,
  LiabilityTypeProperty,
  ShortAccountTypeProperty,
} from '../schema/account';
import { AttachmentArray } from '../schema/attachment';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { PiggyBankArray } from '../schema/piggy-bank';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const AccountSingle = z.object({ data: AccountRead }).passthrough();
const AccountStore = z
  .object({
    name: z.string(),
    type: ShortAccountTypeProperty,
    iban: z.string().nullish(),
    bic: z.string().nullish(),
    account_number: z.string().nullish(),
    opening_balance: z.string().optional(),
    opening_balance_date: z.string().datetime({ offset: true }).nullish(),
    virtual_balance: z.string().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    active: z.boolean().optional().default(true),
    order: z.number().int().optional(),
    include_net_worth: z.boolean().optional().default(true),
    account_role: AccountRoleProperty.optional(),
    credit_card_type: CreditCardTypeProperty.optional(),
    monthly_payment_date: z.string().datetime({ offset: true }).nullish(),
    liability_type: LiabilityTypeProperty.optional(),
    liability_direction: LiabilityDirectionProperty.optional(),
    interest: z.string().nullish().default('0'),
    interest_period: InterestPeriodProperty.optional(),
    notes: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
  })
  .passthrough();
const AccountUpdate = z
  .object({
    name: z.string(),
    iban: z.string().nullish(),
    bic: z.string().nullish(),
    account_number: z.string().nullish(),
    opening_balance: z.string().optional(),
    opening_balance_date: z.string().datetime({ offset: true }).nullish(),
    virtual_balance: z.string().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    active: z.boolean().optional().default(true),
    order: z.number().int().optional(),
    include_net_worth: z.boolean().optional().default(true),
    account_role: AccountRoleProperty.optional(),
    credit_card_type: CreditCardTypeProperty.optional(),
    monthly_payment_date: z.string().datetime({ offset: true }).nullish(),
    liability_type: LiabilityTypeProperty.optional(),
    interest: z.string().nullish(),
    interest_period: InterestPeriodProperty.optional(),
    notes: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
  })
  .passthrough();

export const accountContract = c.router({
  listTransactionByAccount: {
    method: 'GET',
    path: '/v1/accounts/:id/transactions',
    summary: 'List all transactions related to the account.',
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
  listAttachmentByAccount: {
    method: 'GET',
    path: '/v1/accounts/:id/attachments',
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
  listPiggyBankByAccount: {
    method: 'GET',
    path: '/v1/accounts/:id/piggy-banks',
    summary: 'List all piggy banks related to the account.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PiggyBankArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listAccount: {
    method: 'GET',
    path: '/v1/accounts',
    summary: 'List all accounts.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      date: z.string().optional(),
      type: AccountTypeFilter.optional(),
    }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AccountArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeAccount: {
    method: 'POST',
    path: '/v1/accounts',
    summary: 'Create new account.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: AccountStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AccountSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getAccount: {
    method: 'GET',
    path: '/v1/accounts/:id',
    summary: 'Get single account.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ date: z.string().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AccountSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateAccount: {
    method: 'PUT',
    path: '/v1/accounts/:id',
    summary: 'Update existing account.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: AccountUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AccountSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteAccount: {
    method: 'DELETE',
    path: '/v1/accounts/:id',
    summary: 'Permanently delete account.',
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
