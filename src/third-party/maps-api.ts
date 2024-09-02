import axios, { AxiosResponse } from 'axios';
import { AddressComponents, PartialAddress, SearchAPI } from '../lib/address-search';
import { valueOrDefault } from '../helpers';

const SEARCH_LIMIT = 100;

export type TomTomAPIConfig = {
  key: string;
  version: number;
  countrySet: string; //comma separated list of country codes in ISO 3166-1 alpha-2 or alpha-3 code formats
};

const AddressFields = [
  'streetName',
  'municipality',
  'postalCode',
  'countryCode',
  'country',
  'freeformAddress'
] as const;

type RequiredAddressFields = (typeof AddressFields)[number];
type TomTomAddress<Key extends string, Type> = {
  [name in Key]: Type;
};
export type TomTomAPIResult = {
  id: string;
  address: TomTomAddress<RequiredAddressFields, string>;
};

export type TomTomAPIResponse = AxiosResponse<{
  results: TomTomAPIResult[];
}>;

// ensure the returned API result conforms to the expected contract required
// by the library internally to produce a meaningful suggestion
function validResult(result: TomTomAPIResult): boolean {
  return (
    result.hasOwnProperty('id') &&
    result.hasOwnProperty('address') &&
    AddressFields.every((field) => result.address.hasOwnProperty(field))
  );
}

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function mapsApi(
  config: TomTomAPIConfig,
  address: PartialAddress
): Promise<TomTomAPIResponse> {
  const response: TomTomAPIResponse = await axios.get(
    `https://api.tomtom.com/search/${config.version}/search/${address}.json`,
    {
      params: {
        key: config.key,
        limit: SEARCH_LIMIT,
        countrySet: config.countrySet,
        typeahead: true
      }
    }
  );
  return response;
}

export type TomTomMapsAPI = typeof mapsApi;

// This function is doing the mapping from the third party API into our internal library
// data structure to ensure our internal library code does not create a dependency
// to the external third party library
export function getPlaceAutocomplete(config: TomTomAPIConfig, api: TomTomMapsAPI): SearchAPI {
  return async (address: PartialAddress) => {
    const autocomplete = await api(config, address);
    return autocomplete.data.results.filter(validResult).map((result): AddressComponents => {
      return {
        placeId: result.id,
        streetNumber: valueOrDefault(result.address.streetName),
        countryCode: valueOrDefault(result.address.countryCode),
        country: valueOrDefault(result.address.country),
        freeformAddress: valueOrDefault(result.address.freeformAddress),
        municipality: valueOrDefault(result.address.municipality)
      };
    });
  };
}
