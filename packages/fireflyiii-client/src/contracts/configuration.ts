import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { Configuration, ConfigurationArray, PolymorphicProperty } from '../schema/configuration';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';

const c = initContract();

const ConfigurationSingle = z.object({ data: Configuration }).passthrough();
const ConfigurationUpdate = z.object({ value: PolymorphicProperty }).passthrough();

export const configurationContract = c.router({
  getConfiguration: {
    method: 'GET',
    path: '/v1/configuration',
    summary: 'Get Firefly III system configuration values.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/x-www-form-urlencoded', body: ConfigurationArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getSingleConfiguration: {
    method: 'GET',
    path: '/v1/configuration/:name',
    summary: 'Get a single Firefly III system configuration value',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({
      name: z.enum([
        'configuration.is_demo_site',
        'configuration.permission_update_check',
        'configuration.last_update_check',
        'configuration.single_user_mode',
        'firefly.version',
        'firefly.api_version',
        'firefly.default_location',
        'firefly.account_to_transaction',
        'firefly.allowed_opposing_types',
        'firefly.accountRoles',
        'firefly.valid_liabilities',
        'firefly.interest_periods',
        'firefly.enable_external_map',
        'firefly.expected_source_types',
        'app.timezone',
        'firefly.bill_periods',
        'firefly.credit_card_types',
        'firefly.languages',
        'firefly.valid_view_ranges',
      ]),
    }),
    responses: {
      200: ConfigurationSingle,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  setConfiguration: {
    method: 'PUT',
    path: '/v1/configuration/:name',
    summary: 'Update configuration value',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({
      name: z.enum([
        'configuration.is_demo_site',
        'configuration.permission_update_check',
        'configuration.last_update_check',
        'configuration.single_user_mode',
      ]),
    }),
    body: ConfigurationUpdate,
    contentType: 'application/x-www-form-urlencoded',
    responses: {
      200: ConfigurationSingle,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
});
