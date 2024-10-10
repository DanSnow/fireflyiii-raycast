import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { BillArray } from '../schema/budget';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { ObjectGroupArray, ObjectGroupRead } from '../schema/object-group';
import { PiggyBankArray } from '../schema/piggy-bank';

const c = initContract();

const ObjectGroupSingle = z.object({ data: ObjectGroupRead }).passthrough();
const ObjectGroupUpdate = z.object({ title: z.string(), order: z.number().int().optional() }).passthrough();

export const objectGroupContract = c.router({
  listPiggyBankByObjectGroup: {
    method: 'GET',
    path: '/v1/object-groups/:id/piggy-banks',
    summary: 'List all piggy banks related to the object group.',
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
  listBillByObjectGroup: {
    method: 'GET',
    path: '/v1/object-groups/:id/bills',
    summary: 'List all bills with this object group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BillArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  listObjectGroups: {
    method: 'GET',
    path: '/v1/object-groups',
    summary: 'List all object groups.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: ObjectGroupArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getObjectGroup: {
    method: 'GET',
    path: '/v1/object-groups/:id',
    summary: 'Get a single object group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: ObjectGroupSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateObjectGroup: {
    method: 'PUT',
    path: '/v1/object-groups/:id',
    summary: 'Update existing object group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: ObjectGroupUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: ObjectGroupSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteObjectGroup: {
    method: 'DELETE',
    path: '/v1/object-groups/:id',
    summary: 'Delete a object group.',
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
