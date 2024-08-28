import { Config } from './providers/config';
import { TomTomAPIConfig, getPlaceAutocomplete } from './third-party/maps-api';
import {
  AddressSearch,
  addressSearch,
  AddressSuggestions,
  PartialAddress
} from './lib/address-search';
import { AutoCompleteError } from './lib/errors';

export type AutoCompleteVersion = 1 | 2;

export type AutoCompleteConfig = {
  version: AutoCompleteVersion;
};

export type AddressAutoComplete = {
  search: (address: PartialAddress) => Promise<AddressSuggestions>;
  version: () => AutoCompleteVersion;
};

// function to inject the tom tom search API into the autoComplete library code
function configure(version: AutoCompleteVersion): AddressSearch {
  if (version === 1 || version === 2) {
    const tomTomConfig: TomTomAPIConfig = {
      key: Config.tomTomApiKey,
      version: 2,
      countrySet: Config.tomTomCountriesAllowed
    };

    const mapsApi = getPlaceAutocomplete(tomTomConfig);
    return addressSearch(mapsApi);
  } else {
    throw Error(AutoCompleteError.UNSUPPORTED_LIBRARY_VERSION);
  }
}

export function AutoComplete(config: AutoCompleteConfig): AddressAutoComplete {
  return { search: configure(config.version), version: () => config.version };
}
