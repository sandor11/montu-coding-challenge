import { Config } from './providers/config';
import { getPlaceAutocomplete } from './maps-api';

export async function getAutoCompleteDetails(address: any): Promise<any> {
  // get autocomplete results
  const res = getPlaceAutocomplete(Config.getTomTomApiKey(), address).then(
    async (autocompleteResults) => {
      const res: [] = [];
      return res;
    }
  );
  // loop over and get details and map results
  return res;
}
