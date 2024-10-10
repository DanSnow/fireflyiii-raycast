import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { AvailableBudgetArray, AvailableBudgetRead } from '../schema/available-budget';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
} from '../schema/error-response';

const AvailableBudgetSingle = z.object({ data: AvailableBudgetRead }).passthrough();

const c = initContract();

export const availableBudgetContract = c.router({
  listAvailableBudget: {
    method: 'GET',
    path: '/v1/available-budgets',
    summary: 'List all available budget amounts.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AvailableBudgetArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getAvailableBudget: {
    method: 'GET',
    path: '/v1/available-budgets/:id',
    summary: 'Get a single available budget.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: AvailableBudgetSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});
