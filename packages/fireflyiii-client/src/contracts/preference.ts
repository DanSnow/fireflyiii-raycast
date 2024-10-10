import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { PolymorphicProperty } from '../schema/configuration';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { Preference, PreferenceArray, PreferenceRead } from '../schema/preference';

const c = initContract();

const PreferenceSingle = z.object({ data: PreferenceRead }).passthrough();
const PreferenceUpdate = z.object({ data: PolymorphicProperty }).passthrough();

export const preferenceContract = c.router({
  listPreference: {
    method: 'GET',
    path: '/v1/preferences',
    summary: 'List all users preferences.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PreferenceArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storePreference: {
    method: 'POST',
    path: '/v1/preferences',
    summary: 'Store a new preference for this user.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: Preference,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PreferenceSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getPreference: {
    method: 'GET',
    path: '/v1/preferences/:name',
    summary: 'Return a single preference.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ name: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PreferenceSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updatePreference: {
    method: 'PUT',
    path: '/v1/preferences/:name',
    summary: 'Update preference',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ name: z.string() }),
    body: PreferenceUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: PreferenceSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
});
