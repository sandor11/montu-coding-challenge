import { describe } from '@jest/globals';
import { Config } from '../src/providers/config';
import { getPlaceAutocomplete, TomTomAPIConfig } from '../src/third-party/maps-api';

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  const tomTomConfig: TomTomAPIConfig = {
    key: Config.tomTomApiKey,
    version: 2,
    countrySet: Config.tomTomCountriesAllowed
  };

  const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig);

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const res = await getAutoCompleteDetails('asfasffasfasafsafs');
      expect(res).toStrictEqual([]);
    });

    it('handles error', async () => {
      expect(getAutoCompleteDetails('')).rejects.toThrow();
    });
  });
});
