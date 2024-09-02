// disabling tschecks to allow us to check the case of an unsupported
// version being passed in the config since its defined as a union type
//
// @eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe } from '@jest/globals';
import { Config } from '../src/providers/config';
import {
  getPlaceAutocomplete,
  TomTomAPIConfig,
  TomTomAPIResponse,
  validResult
} from '../src/third-party/maps-api';

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

  describe('validResult', () => {
    const idWithNoAddress: TomTomAPIResult = {
      id: 'abc'
    };

    const addressWithNoId: TomTomAPIResult = {
      address: {
        streetName: 'Charlotte St',
        municipality: 'Melbourne',
        postalCode: '3000',
        countryCode: 'AU',
        country: 'Australia',
        freeformAddress: '32 Charlotte St, Melbourne Australia 3000'
      }
    };

    const completeWithIdAndAddress: TomTomAPIResult = {
      ...idWithNoAddress,
      ...addressWithNoId
    };

    it('result without an address is invalid', async () => {
      expect(validResult(idWithNoAddress)).toBeFalsy();
    });

    it('result without an id is invalid', async () => {
      expect(validResult(addressWithNoId)).toBeFalsy();
    });

    it('handles a valid result', async () => {
      expect(validResult(completeWithIdAndAddress)).toBeTruthy();
    });

    it('result with a missing required address field', async () => {
      const missingARequiredAddressField: TomTomAPIResult = {
        ...idWithNoAddress,
        ...addressWithNoId
      };

      delete missingARequiredAddressField.address.freeformAddress;
      expect(validResult(missingARequiredAddressField)).toBeFalsy();
    });
  });
});
