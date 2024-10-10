import { z } from 'zod';

export const ConfigValueFilter = z.enum([
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
]);
export const StringArrayItem = z.string();
export const PolymorphicProperty = z.union([
  z.boolean(),
  z.string(),
  z.object({}).passthrough(),
  z.array(StringArrayItem),
]);
export const Configuration = z
  .object({ title: ConfigValueFilter, value: PolymorphicProperty, editable: z.boolean() })
  .passthrough();
export const ConfigurationArray = z.array(Configuration);
