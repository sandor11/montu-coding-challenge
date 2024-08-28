import { AddressAutoComplete, AutoComplete, AutoCompleteConfig } from './auto-complete';
import { AddressSuggestion, AddressSuggestions, PartialAddress } from './lib/address-search';
import { AutoCompleteError } from './lib/errors';

// re-export types that we want to be available to the library users
export {
  AutoComplete,
  AutoCompleteConfig,
  AutoCompleteError,
  AddressAutoComplete,
  AddressSuggestion,
  AddressSuggestions,
  PartialAddress
};
