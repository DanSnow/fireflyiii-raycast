import { initClient, initContract, isZodType } from '@ts-rest/core';
import { fetch } from 'ofetch';
import { z } from 'zod';
import { accountContract } from './contracts/account';
import { attachmentContract } from './contracts/attachment';
import { autoCompleteContract } from './contracts/autocomplete';
import { billContract } from './contracts/bill';
import { categoryContract } from './contracts/category';
import { configurationContract } from './contracts/configuration';
import { currencyContract } from './contracts/currency';
import { insightContract } from './contracts/insight';
import { linkTypeContract } from './contracts/link-type';
import { objectGroupContract } from './contracts/object-group';
import { piggyBankContract } from './contracts/piggy-bank';
import { preferenceContract } from './contracts/preference';
import { recurrenceContract } from './contracts/recurrence';
import { ruleContract } from './contracts/rule';
import { ruleGroupContract } from './contracts/rule-group';
import { searchContract } from './contracts/search';
import { tagContract } from './contracts/tag';
import { transactionContract } from './contracts/transaction';
import { transactionJournalContract } from './contracts/transaction-journal';
import { transactionLinkContract } from './contracts/transaction-link';
import { userContract } from './contracts/user';
import { webhookContract } from './contracts/webhook';
import {
  BadRequestResponse,
  InternalExceptionResponse,
  NotFoundResponse,
  UnauthenticatedResponse,
} from './schema/error-response';
import { UserSingle } from './schema/user';

const c = initContract();

const ChartDataPoint = z.object({ key: z.string().optional() }).passthrough();
const ChartDataSet = z
  .object({
    label: z.string().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    start_date: z.string().datetime({ offset: true }).optional(),
    end_date: z.string().datetime({ offset: true }).optional(),
    type: z.string().optional(),
    yAxisID: z.number().int().optional(),
    entries: z.array(ChartDataPoint).optional(),
  })
  .passthrough();
const ChartLine = z.array(ChartDataSet);
const BasicSummaryEntry = z
  .object({
    key: z.string().optional(),
    title: z.string().optional(),
    monetary_value: z.number().optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    value_parsed: z.string().optional(),
    local_icon: z.string().optional(),
    sub_title: z.string().optional(),
  })
  .passthrough();
const BasicSummary = z.record(BasicSummaryEntry);
const CronResultRow = z
  .object({
    job_fired: z.boolean().nullish(),
    job_succeeded: z.boolean().nullish(),
    job_errored: z.boolean().nullish(),
    message: z.string().nullish(),
  })
  .passthrough();
const CronResult = z
  .object({
    recurring_transactions: CronResultRow.optional(),
    auto_budgets: CronResultRow.optional(),
    telemetry: CronResultRow.optional(),
  })
  .passthrough();
const SystemInfo = z
  .object({
    data: z
      .object({
        version: z.string().optional(),
        api_version: z.string().optional(),
        php_version: z.string().optional(),
        os: z.string().optional(),
        driver: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const contract = c.router({
  autocomplete: autoCompleteContract,
  insight: insightContract,
  account: accountContract,
  attachment: attachmentContract,
  bill: billContract,
  category: categoryContract,
  linkType: linkTypeContract,
  transactionLink: transactionLinkContract,
  objectGroup: objectGroupContract,
  ruleGroup: ruleGroupContract,
  configuration: configurationContract,
  currency: currencyContract,
  piggyBank: piggyBankContract,
  preference: preferenceContract,
  recurrence: recurrenceContract,
  rule: ruleContract,
  search: searchContract,
  transactionJournal: transactionJournalContract,
  transaction: transactionContract,
  tag: tagContract,
  user: userContract,
  webhoook: webhookContract,
  getChartAccountOverview: {
    method: 'GET',
    path: '/v1/chart/account/overview',
    summary: 'Dashboard chart with asset account balance information.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string(), end: z.string() }),
    responses: {
      200: ChartLine,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  bulkUpdateTransactions: {
    method: 'POST',
    path: '/v1/data/bulk/transactions',
    summary:
      'Bulk update transaction properties. For more information, see https://docs.firefly-iii.org/references/firefly-iii/api/specials/',
    query: z.object({ query: z.string() }),
    body: z.void(),
    responses: {
      204: z.void(),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  purgeData: {
    method: 'DELETE',
    path: '/v1/data/purge',
    summary: 'Endpoint to purge user data',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    body: z.void(),
    responses: { 204: z.void(), 400: BadRequestResponse, 401: UnauthenticatedResponse, 500: InternalExceptionResponse },
  },
  getBasicSummary: {
    method: 'GET',
    path: '/v1/summary/basic',
    summary: 'Returns basic sums of the users data.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ start: z.string(), end: z.string(), currency_code: z.string().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: BasicSummary }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getAbout: {
    method: 'GET',
    path: '/v1/about',
    summary: 'System information end point.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    responses: {
      200: SystemInfo,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getCurrentUser: {
    method: 'GET',
    path: '/v1/about/user',
    summary: 'Currently authenticated user endpoint.',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    responses: {
      200: c.otherResponse({ contentType: 'application/vnd.api+json', body: UserSingle }),
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
  getCron: {
    method: 'GET',
    path: '/v1/cron/:cliToken',
    summary: 'Cron job endpoint',
    headers: z.object({ 'X-Trace-Id': z.string().uuid().optional() }),
    query: z.object({ date: z.string().optional(), force: z.boolean().optional() }),
    pathParams: z.object({ cliToken: z.string() }),
    responses: {
      200: CronResult,
      400: BadRequestResponse,
      401: UnauthenticatedResponse,
      404: NotFoundResponse,
      500: InternalExceptionResponse,
    },
  },
});

export interface CreateFirefiyClientInput {
  baseUrl: string;
  apiKey: string;
  headers?: Record<string, string>;
}

export function createFireflyClient({ apiKey, baseUrl }: CreateFirefiyClientInput) {
  return initClient(contract, {
    baseUrl,
    baseHeaders: {
      Authorization: `Bearer ${apiKey}`,
    },
    api: async ({ route, path, method, headers, body, validateResponse, fetchOptions }) => {
      const result = await fetch(path, {
        ...fetchOptions,
        method,
        headers,
        body,
      });

      const contentType = result.headers.get('content-type');

      if (contentType?.includes('application/') && contentType?.includes('json')) {
        const response = {
          status: result.status,
          body: await result.json(),
          headers: result.headers,
        };

        const responseSchema = route.responses[response.status];
        if ((validateResponse ?? route.validateResponseOnClient) && isZodType(responseSchema)) {
          return {
            ...response,
            body: responseSchema.parse(response.body),
          };
        }

        return response;
      }

      if (contentType?.includes('text/')) {
        return {
          status: result.status,
          body: await result.text(),
          headers: result.headers,
        };
      }

      return {
        status: result.status,
        body: await result.blob(),
        headers: result.headers,
      };
    },
  });
}
