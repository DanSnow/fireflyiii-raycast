import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { RuleActionKeyword, RuleArray, RuleRead, RuleTriggerKeyword, RuleTriggerType } from '../schema/rule';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const RuleSingle = z.object({ data: RuleRead }).passthrough();
const RuleTriggerStore = z
  .object({
    type: RuleTriggerKeyword,
    value: z.string(),
    order: z.number().int().optional(),
    active: z.boolean().optional().default(true),
    prohibited: z.boolean().optional().default(false),
    stop_processing: z.boolean().optional().default(false),
  })
  .passthrough();
const RuleActionStore = z
  .object({
    type: RuleActionKeyword,
    value: z.string().nullable(),
    order: z.number().int().optional(),
    active: z.boolean().optional().default(true),
    stop_processing: z.boolean().optional().default(false),
  })
  .passthrough();
const RuleStore = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    rule_group_id: z.string(),
    rule_group_title: z.string().optional(),
    order: z.number().int().optional(),
    trigger: RuleTriggerType,
    active: z.boolean().optional().default(true),
    strict: z.boolean().optional().default(true),
    stop_processing: z.boolean().optional(),
    triggers: z.array(RuleTriggerStore),
    actions: z.array(RuleActionStore),
  })
  .passthrough();
const RuleTriggerUpdate = z
  .object({
    type: RuleTriggerKeyword.optional(),
    value: z.string().optional(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
    stop_processing: z.boolean().optional(),
  })
  .passthrough();
const RuleActionUpdate = z
  .object({
    type: RuleActionKeyword.optional(),
    value: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
    stop_processing: z.boolean().optional(),
  })
  .passthrough();
const RuleUpdate = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    rule_group_id: z.string().optional(),
    order: z.number().int().optional(),
    trigger: RuleTriggerType.optional(),
    active: z.boolean().optional().default(true),
    strict: z.boolean().optional(),
    stop_processing: z.boolean().optional().default(false),
    triggers: z.array(RuleTriggerUpdate).optional(),
    actions: z.array(RuleActionUpdate).optional(),
  })
  .passthrough();

export const ruleContract = c.router({
  testRule: {
    method: 'GET',
    path: '/v1/rules/:id/test',
    summary: 'Test which transactions would be hit by the rule. No changes will be made.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
      'accounts[]': z.array(z.number().int()).optional(),
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
  fireRule: {
    method: 'POST',
    path: '/v1/rules/:id/trigger',
    summary: 'Fire the rule on your transactions.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
      'accounts[]': z.array(z.number().int()).optional(),
    }),
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
  listRule: {
    method: 'GET',
    path: '/v1/rules',
    summary: 'List all rules.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeRule: {
    method: 'POST',
    path: '/v1/rules',
    summary: 'Store a new rule',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: RuleStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getRule: {
    method: 'GET',
    path: '/v1/rules/:id',
    summary: 'Get a single rule.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateRule: {
    method: 'PUT',
    path: '/v1/rules/:id',
    summary: 'Update existing rule.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: RuleUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteRule: {
    method: 'DELETE',
    path: '/v1/rules/:id',
    summary: 'Delete an rule.',
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
