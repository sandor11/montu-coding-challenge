// disabling tschecks to enable us to test broken data structures that may
// be returned from the tom tom api
//
// @eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe } from '@jest/globals';
import { Config } from '../src/providers/config';
import {
  getPlaceAutocomplete,
  mapsApi,
  TomTomAPIConfig,
  TomTomAPIResponse,
  TomTomAPIResult,
  TomTomMapsAPI
} from '../src/third-party/maps-api';
import { PartialAddress } from '../src/lib/address-search';

// These are end-to-end tests and need an api key
describe('Tomtom Places unit tests', () => {
  const tomTomConfig: TomTomAPIConfig = {
    key: Config.tomTomApiKey,
    version: 2,
    countrySet: Config.tomTomCountriesAllowed
  };

  const mockMapsApi =
    (response: TomTomAPIResponse): TomTomMapsAPI =>
    (config: TomTomAPIConfig, address: PartialAddress): Promise<TomTomAPIResponse> => {
      return new Promise(function (resolve, reject) {
        if (response.status === 200) {
          resolve(response);
        } else {
          throw Error('apiError');
        }
      });
    };

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const mockApi = mockMapsApi({
        data: { results: [] },
        status: 200,
        statusText: 'OK',
        headers: [],
        config: {}
      });
      const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mockApi);
      const res = await getAutoCompleteDetails('asfasffasfasafsafs');

      expect(res).toStrictEqual([]);
    });

    it('handles error', async () => {
      const mockApi = mockMapsApi({
        data: { results: [] },
        status: 500,
        statusText: 'OK',
        headers: [],
        config: {}
      });
      const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mockApi);
      expect(getAutoCompleteDetails('')).rejects.toThrow();
    });
  });

  describe('validResult', () => {
    it('result without an address is invalid', async () => {
      const result = getValidResult();
      delete result.id;
      const mockApi = mockMapsApi({
        data: { results: [result] },
        status: 200,
        statusText: 'OK',
        headers: [],
        config: {}
      });
      const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mockApi);
      const res = await getAutoCompleteDetails('32 Charlotte St');

      expect(res.length).toBe(0);
    });

    it('result without an id is invalid', async () => {
      const result = getValidResult();
      delete result.address;

      const mockApi = mockMapsApi({
        data: { results: [result] },
        status: 200,
        statusText: 'OK',
        headers: [],
        config: {}
      });
      const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mockApi);
      const res = await getAutoCompleteDetails('32 Charlotte St');

      expect(res.length).toBe(0);
    });

    it('handles a valid result', async () => {
      const result = getValidResult();

      const mockApi = mockMapsApi({
        data: { results: [result] },
        status: 200,
        statusText: 'OK',
        headers: [],
        config: {}
      });
      const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mockApi);
      const res = await getAutoCompleteDetails('32 Charlotte St');

      expect(res.length).toBe(1);
    });

    it('result with a missing required address field', async () => {
      const result = getValidResult();
      delete result.address.freeformAddress;

      const mockApi = mockMapsApi({
        data: { results: [result] },
        status: 200,
        statusText: 'OK',
        headers: [],
        config: {}
      });
      const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mockApi);
      const res = await getAutoCompleteDetails('32 Charlotte St');

      expect(res.length).toBe(0);
    });
  });
});

function getValidResult(): TomTomAPIResult {
  return {
    id: 'abc',
    address: {
      streetName: 'Charlotte St',
      municipality: 'Melbourne',
      postalCode: '3000',
      countryCode: 'AU',
      country: 'Australia',
      freeformAddress: '32 Charlotte St, Melbourne Australia 3000'
    }
  };
}

describe('Tomtom Places E2E Tests', () => {
  const tomTomConfig: TomTomAPIConfig = {
    key: Config.tomTomApiKey,
    version: 2,
    countrySet: Config.tomTomCountriesAllowed
  };
  const getAutoCompleteDetails = getPlaceAutocomplete(tomTomConfig, mapsApi);

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
