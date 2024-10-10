import { getPreferenceValues } from '@raycast/api';
import { z } from 'zod';

const preferenceValuesSchema = z.object({
  baseUrl: z.string().url(),
  apiKey: z.string(),
});

type PreferenceValues = z.infer<typeof preferenceValuesSchema>;

export function getPreference(): PreferenceValues {
  return preferenceValuesSchema.parse(getPreferenceValues<PreferenceValues>());
}
