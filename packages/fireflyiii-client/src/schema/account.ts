import { z } from 'zod';
import { Meta } from './meta';

export const AccountTypeProperty = z.enum([
  'Default account',
  'Cash account',
  'Asset account',
  'Expense account',
  'Revenue account',
  'Initial balance account',
  'Beneficiary account',
  'Import account',
  'Reconciliation account',
  'Loan',
  'Debt',
  'Mortgage',
]);

export const ShortAccountTypeProperty = z.enum([
  'asset',
  'expense',
  'import',
  'revenue',
  'cash',
  'liability',
  'liabilities',
  'initial-balance',
  'reconciliation',
]);

export const AccountTypeFilter = z.enum([
  'all',
  'asset',
  'cash',
  'expense',
  'revenue',
  'special',
  'hidden',
  'liability',
  'liabilities',
  'Default account',
  'Cash account',
  'Asset account',
  'Expense account',
  'Revenue account',
  'Initial balance account',
  'Beneficiary account',
  'Import account',
  'Reconciliation account',
  'Loan',
  'Debt',
  'Mortgage',
]);

export const AccountRoleProperty = z
  .enum(['defaultAsset', 'sharedAsset', 'savingAsset', 'ccAsset', 'cashWalletAsset', 'null'])
  .nullish();
export const CreditCardTypeProperty = z.enum(['monthlyFull', 'null']).nullish();
export const LiabilityTypeProperty = z.enum(['loan', 'debt', 'mortgage', 'null']).nullish();
export const LiabilityDirectionProperty = z.enum(['credit', 'debit', 'null']).nullish();
export const InterestPeriodProperty = z
  .enum(['weekly', 'monthly', 'quarterly', 'half-year', 'yearly', 'null'])
  .nullish();

export const Account = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    active: z.boolean().optional().default(true),
    order: z.number().int().nullish(),
    name: z.string(),
    type: ShortAccountTypeProperty,
    account_role: AccountRoleProperty.optional(),
    currency_id: z.string().optional(),
    currency_code: z.string().optional(),
    currency_symbol: z.string().optional(),
    currency_decimal_places: z.number().int().optional(),
    current_balance: z.string().optional(),
    current_balance_date: z.string().datetime({ offset: true }).optional(),
    iban: z.string().nullish(),
    bic: z.string().nullish(),
    account_number: z.string().nullish(),
    opening_balance: z.string().optional(),
    current_debt: z.string().nullish(),
    opening_balance_date: z.string().datetime({ offset: true }).nullish(),
    virtual_balance: z.string().optional(),
    include_net_worth: z.boolean().optional().default(true),
    credit_card_type: CreditCardTypeProperty.optional(),
    monthly_payment_date: z.string().datetime({ offset: true }).nullish(),
    liability_type: LiabilityTypeProperty.optional(),
    liability_direction: LiabilityDirectionProperty.optional(),
    interest: z.string().nullish(),
    interest_period: InterestPeriodProperty.optional(),
    notes: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    zoom_level: z.number().int().nullish(),
  })
  .passthrough();
export const AccountRead = z.object({ type: z.string(), id: z.string(), attributes: Account }).passthrough();
export const AccountArray = z.object({ data: z.array(AccountRead), meta: Meta }).passthrough();
