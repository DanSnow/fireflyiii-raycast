import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AttachmentArray } from '../schema/attachment';
import { Category, CategoryArray, CategoryRead } from '../schema/category';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const CategorySingle = z.object({ data: CategoryRead }).passthrough();
const CategoryUpdate = z.object({ name: z.string(), notes: z.string().nullish() }).passthrough();

export const categoryContract = c.router({
  listTransactionByCategory: {
    method: 'GET',
    path: '/v1/categories/:id/transactions',
    summary: 'List all transactions in a category.',
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
  listAttachmentByCategory: {
    method: 'GET',
    path: '/v1/categories/:id/attachments',
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
  listCategory: {
    method: 'GET',
    path: '/v1/categories',
    summary: 'List all categories.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CategoryArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeCategory: {
    method: 'POST',
    path: '/v1/categories',
    summary: 'Store a new category',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: Category,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CategorySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getCategory: {
    method: 'GET',
    path: '/v1/categories/:id',
    summary: 'Get a single category.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string().optional(), end: z.string().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CategorySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateCategory: {
    method: 'PUT',
    path: '/v1/categories/:id',
    summary: 'Update existing category.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: CategoryUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: CategorySingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteCategory: {
    method: 'DELETE',
    path: '/v1/categories/:id',
    summary: 'Delete a category.',
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
