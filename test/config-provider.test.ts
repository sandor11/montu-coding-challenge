import { describe } from '@jest/globals';
import { Config } from '../src/providers/config';

// These are config loading tests
describe('Test the correct configuration is correctly loaded', () => {
  describe('getTomTomApiKey', () => {
    it('loads the tom tom API Key', () => {
      expect(Config).toHaveProperty('tomTomApiKey');

      const apiKey = Config.tomTomApiKey;
      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');

      const allowedCountries = Config.tomTomCountriesAllowed;
      expect(allowedCountries).toBeDefined();
      expect(allowedCountries).toBe('AU,AUS');
    });
  });
});
