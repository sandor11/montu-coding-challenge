import { Config } from './providers/config';
import { getPlaceAutocomplete, PlaceSearchResult } from './maps-api';

export async function getAutoCompleteDetails(address: any): Promise<PlaceSearchResult[]> {
  // get autocomplete results
  const res = getPlaceAutocomplete(Config.getTomTomApiKey(), address).then(
    async (autocompleteResults) => autocompleteResults
  );
  // loop over and get details and map results
  return res;
}
