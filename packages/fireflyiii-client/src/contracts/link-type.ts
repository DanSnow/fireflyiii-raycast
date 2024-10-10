import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { LinkType, LinkTypeArray, LinkTypeRead } from '../schema/link-type';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const LinkTypeSingle = z.object({ data: LinkTypeRead }).passthrough();
const LinkTypeUpdate = z
  .object({ name: z.string().optional(), inward: z.string().optional(), outward: z.string().optional() })
  .passthrough();

export const linkTypeContract = c.router({
  listTransactionByLinkType: {
    method: 'GET',
    path: '/v1/link-types/:id/transactions',
    summary: 'List all transactions under this link type.',
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
      200: TransactionArray,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listLinkType: {
    method: 'GET',
    path: '/v1/link-types',
    summary: 'List all types of links.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: LinkTypeArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeLinkType: {
    method: 'POST',
    path: '/v1/link-types',
    summary: 'Create a new link type',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: LinkType,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: LinkTypeSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getLinkType: {
    method: 'GET',
    path: '/v1/link-types/:id',
    summary: 'Get single a link type.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: LinkTypeSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateLinkType: {
    method: 'PUT',
    path: '/v1/link-types/:id',
    summary: 'Update existing link type.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: LinkTypeUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: LinkTypeSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteLinkType: {
    method: 'DELETE',
    path: '/v1/link-types/:id',
    summary: 'Permanently delete link type.',
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
