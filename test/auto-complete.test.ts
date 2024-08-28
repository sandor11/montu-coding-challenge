import { describe } from '@jest/globals';
import { getAutoCompleteDetails } from '../src';

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  describe('getAutoCompleteDetails', () => {
    it('returns a promise', () => {
      const res = getAutoCompleteDetails('Charlotte Street');
      expect(res).toBeInstanceOf(Promise);
    });

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('32 Charlotte Street');
      const firstRes = res[0];
      expect(firstRes).toHaveProperty('suggestion');

      const firstComponents = firstRes.components;
      expect(firstComponents).toHaveProperty('placeId');
      expect(firstComponents).toHaveProperty('streetNumber');
      expect(firstComponents).toHaveProperty('countryCode');
      expect(firstComponents).toHaveProperty('country');
      expect(firstComponents).toHaveProperty('freeformAddress');
      expect(firstComponents).toHaveProperty('municipality');
    });
  });
});
