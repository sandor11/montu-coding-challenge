import { describe } from '@jest/globals';
import { Config } from '../src/providers/config';

// These are config loading tests
describe('Tomtom Places E2E Tests', () => {
  describe('getTomTomApiKey', () => {
    it('loads the tom tom API Key', () => {
      expect(Config).toHaveProperty('tomTomApiKey');

      const apiKey = Config.tomTomApiKey;
      expect(apiKey).toBeDefined();
      expect(apiKey).not.toBe('');
    });
  });
});
