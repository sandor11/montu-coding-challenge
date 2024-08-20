import {
  AddressAutoComplete,
  AddressSuggestion,
  AddressSuggestions,
  autoComplete,
  PartialAddress
} from './lib/auto-complete';
import { Config } from './providers/config';
import { getPlaceAutocomplete, TomTomAPIConfig } from './third-party/maps-api';

// function to inject the tom tom search API into the autoComplete library code
function configure(): AddressAutoComplete {
  const tomTomConfig: TomTomAPIConfig = {
    key: Config.tomTomApiKey,
    version: 2,
    countrySet: Config.tomTomCountriesAllowed
  };

  const mapsApi = getPlaceAutocomplete(tomTomConfig);
  return autoComplete(mapsApi);
}

const getAutoCompleteDetails = configure(); // wire up the dependencies

// re-export types that we want to be available to the library users
export {
  getAutoCompleteDetails,
  AddressAutoComplete,
  AddressSuggestion,
  AddressSuggestions,
  PartialAddress
};
