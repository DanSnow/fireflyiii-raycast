import { z } from 'zod';
import { Meta, ObjectLink, PageLink } from './meta';

export const RuleTriggerType = z.enum(['store-journal', 'update-journal']);
export const RuleTriggerKeyword = z.enum([
  'from_account_starts',
  'from_account_ends',
  'from_account_is',
  'from_account_contains',
  'to_account_starts',
  'to_account_ends',
  'to_account_is',
  'to_account_contains',
  'amount_less',
  'amount_exactly',
  'amount_more',
  'description_starts',
  'description_ends',
  'description_contains',
  'description_is',
  'transaction_type',
  'category_is',
  'budget_is',
  'tag_is',
  'currency_is',
  'has_attachments',
  'has_no_category',
  'has_any_category',
  'has_no_budget',
  'has_any_budget',
  'has_no_tag',
  'has_any_tag',
  'notes_contains',
  'notes_start',
  'notes_end',
  'notes_are',
  'no_notes',
  'any_notes',
  'source_account_is',
  'destination_account_is',
  'source_account_starts',
]);
export const RuleTrigger = z
  .object({
    id: z.string().optional(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    type: RuleTriggerKeyword,
    value: z.string(),
    prohibited: z.boolean().optional().default(false),
    order: z.number().int().optional(),
    active: z.boolean().optional().default(true),
    stop_processing: z.boolean().optional().default(false),
  })
  .passthrough();
export const RuleActionKeyword = z.enum([
  'user_action',
  'set_category',
  'clear_category',
  'set_budget',
  'clear_budget',
  'add_tag',
  'remove_tag',
  'remove_all_tags',
  'set_description',
  'append_description',
  'prepend_description',
  'set_source_account',
  'set_destination_account',
  'set_notes',
  'append_notes',
  'prepend_notes',
  'clear_notes',
  'link_to_bill',
  'convert_withdrawal',
  'convert_deposit',
  'convert_transfer',
  'delete_transaction',
]);
export const RuleAction = z
  .object({
    id: z.string().optional(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    type: RuleActionKeyword,
    value: z.string().nullable(),
    order: z.number().int().optional(),
    active: z.boolean().optional().default(true),
    stop_processing: z.boolean().optional().default(false),
  })
  .passthrough();
export const Rule = z
  .object({
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    title: z.string(),
    description: z.string().optional(),
    rule_group_id: z.string(),
    rule_group_title: z.string().optional(),
    order: z.number().int().optional(),
    trigger: RuleTriggerType,
    active: z.boolean().optional().default(true),
    strict: z.boolean().optional(),
    stop_processing: z.boolean().optional().default(false),
    triggers: z.array(RuleTrigger),
    actions: z.array(RuleAction),
  })
  .passthrough();
export const RuleRead = z
  .object({ type: z.string(), id: z.string(), attributes: Rule, links: ObjectLink })
  .passthrough();
export const RuleArray = z.object({ data: z.array(RuleRead), meta: Meta, links: PageLink }).passthrough();
