import axios, { AxiosResponse } from 'axios';

export type PlaceSearchResult = {
  placeId: string;
};

type TomTomAPIResult = {
  id: string;
};

type TomTomAPIResponse = AxiosResponse<{
  results: TomTomAPIResult[];
}>;

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string) {
  const autocomplete: TomTomAPIResponse = await axios.get(
    `https://api.tomtom.com/search/2/search/${address}.json`,
    {
      params: {
        key,
        limit: 100
      }
    }
  );
  return autocomplete.data.results.map((result): PlaceSearchResult => {
    return {
      placeId: result.id
    };
  });
}
