// Define the types for the AutoComplete Library which the users of the library will see and work with
export type PartialAddress = string;
export type AddressComponents = {
  placeId: string;
  streetNumber: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
};
export type AddressSuggestion = {
  suggestion: string;
  components: AddressComponents;
};
export type AddressSuggestions = Array<AddressSuggestion>;
export type AddressAutoComplete = (address: PartialAddress) => Promise<AddressSuggestions>;

// Type alias to allow a separation to what the library consumer see and the depndency
// the third party API will see
export type SearchAPI = (address: PartialAddress) => Promise<AddressComponents[]>;

function configureAutoComplete(searchApi: SearchAPI): AddressAutoComplete {
  return async (address: PartialAddress): Promise<AddressSuggestions> => {
    const searchResults = await searchApi(address).then((components) => components);
    return searchResults.map((components) => {
      return { suggestion: components.freeformAddress, components };
    });
  };
}

export const autoComplete = (searchApi: SearchAPI) => configureAutoComplete(searchApi);
