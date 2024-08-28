import axios, { AxiosResponse } from 'axios';
import { AddressComponents, PartialAddress, SearchAPI } from '../lib/address-search';
import { valueOrDefault } from '../helpers';

const SEARCH_LIMIT = 100;

export type TomTomAPIConfig = {
  key: string;
  version: number;
  countrySet: string; //comma separated list of country codes in ISO 3166-1 alpha-2 or alpha-3 code formats
};

export type TomTomAPIResult = {
  id: string;
  address: {
    streetName: string;
    municipality: string;
    postalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    localName: string;
  };
};

export type TomTomAPIResponse = AxiosResponse<{
  results: TomTomAPIResult[];
}>;

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
async function mapsApi(config: TomTomAPIConfig, address: PartialAddress) {
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

// This function is doing the mapping from the third party API into our internal library
// data structure to ensure our internal library code does not create a dependency
// to the external third party library
export function getPlaceAutocomplete(config: TomTomAPIConfig): SearchAPI {
  return async (address: PartialAddress) => {
    const autocomplete = await mapsApi(config, address);
    return autocomplete.data.results.map((result): AddressComponents => {
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
