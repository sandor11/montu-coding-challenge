import { describe } from '@jest/globals';
import { AddressComponents, addressSearch, SearchAPI } from '../src/lib/address-search';

describe('Test the address search component', () => {
  const addressComponents: AddressComponents = {
    placeId: 'abcd',
    streetNumber: '32',
    countryCode: 'AU',
    country: 'Australia',
    freeformAddress: '32 Charlotte Street, Melbourne, VIC, 7000',
    municipality: 'Melbourne'
  };
  const searchApi: SearchAPI = (address): Promise<AddressComponents[]> => {
    return new Promise(function (resolve, reject) {
      resolve([addressComponents]);
    });
  };

  it('returns a promise', () => {
    const res = addressSearch(searchApi)('32 Charlotte St');
    expect(res).toBeInstanceOf(Promise);
  });

  it('can fetch from the autocomplete api', async () => {
    const res = await addressSearch(searchApi)('32 Charlotte St');
    const firstRes = res[0];
    expect(firstRes).toHaveProperty('suggestion');

    const firstComponents = firstRes.components;
    expect(firstComponents).toHaveProperty('placeId');
    expect(firstComponents).toHaveProperty('streetNumber');
    expect(firstComponents).toHaveProperty('countryCode');
    expect(firstComponents).toHaveProperty('country');
    expect(firstComponents).toHaveProperty('freeformAddress');
    expect(firstComponents).toHaveProperty('municipality');
  });
});
