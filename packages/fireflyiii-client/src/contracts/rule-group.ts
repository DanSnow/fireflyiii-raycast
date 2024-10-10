import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
  ValidationErrorResponse,
} from '../schema/error-response';
import { RuleArray } from '../schema/rule';
import { RuleGroupArray, RuleGroupRead } from '../schema/rule-group';
import { TransactionArray } from '../schema/transaction';

const c = initContract();

const RuleGroupSingle = z.object({ data: RuleGroupRead }).passthrough();
const RuleGroupStore = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
  })
  .passthrough();
const RuleGroupUpdate = z
  .object({
    title: z.string().optional(),
    description: z.string().nullish(),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
  })
  .passthrough();

export const ruleGroupContract = c.router({
  listRuleByGroup: {
    method: 'GET',
    path: '/v1/rule-groups/:id/rules',
    summary: 'List rules in this rule group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  testRuleGroup: {
    method: 'GET',
    path: '/v1/rule-groups/:id/test',
    summary: 'Test which transactions would be hit by the rule group. No changes will be made.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({
      limit: z.number().int().optional(),
      page: z.number().int().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
      search_limit: z.number().int().optional(),
      triggered_limit: z.number().int().optional(),
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
  fireRuleGroup: {
    method: 'POST',
    path: '/v1/rule-groups/:id/trigger',
    summary: 'Fire the rule group on your transactions.',
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
  listRuleGroup: {
    method: 'GET',
    path: '/v1/rule-groups',
    summary: 'List all rule groups.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ limit: z.number().int().optional(), page: z.number().int().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleGroupArray }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  storeRuleGroup: {
    method: 'POST',
    path: '/v1/rule-groups',
    summary: 'Store a new rule group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: RuleGroupStore,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleGroupSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  getRuleGroup: {
    method: 'GET',
    path: '/v1/rule-groups/:id',
    summary: 'Get a single rule group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleGroupSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  updateRuleGroup: {
    method: 'PUT',
    path: '/v1/rule-groups/:id',
    summary: 'Update existing rule group.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    pathParams: z.object({ id: z.string() }),
    body: RuleGroupUpdate,
    contentType: 'application/json',
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: RuleGroupSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      422: ValidationErrorResponse,
      500: InternalExceptionResponse,
    },
  },
  deleteRuleGroup: {
    method: 'DELETE',
    path: '/v1/rule-groups/:id',
    summary: 'Delete a rule group.',
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
