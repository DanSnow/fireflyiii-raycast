import { createFireflyClient } from 'fireflyiii-client';
import { getPreference } from './preference';

export function createClient() {
  const preference = getPreference();
  return createFireflyClient(preference);
}
