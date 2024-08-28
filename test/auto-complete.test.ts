// disabling tschecks to allow us to check the case of an unsupported
// version being passed in the config since its defined as a union type
//
// @eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe } from '@jest/globals';
import { AutoComplete, AutoCompleteConfig, AutoCompleteError } from '../src';

// These are config loading tests
describe('Test the library is able to be imported', () => {
  describe('test the libray entry point', () => {
    it('provides an AutoComplete function', () => {
      expect(AutoComplete).toBeInstanceOf(Object);
    });

    it('accepts a configuration object for suppling library version', () => {
      const autoCompleteConfig: AutoCompleteConfig = {
        version: 1
      };

      const addressSearch = AutoComplete(autoCompleteConfig);
      expect(addressSearch.search).toBeInstanceOf(Function);
      expect(addressSearch.version()).toBe(1);
    });

    it('throws an error if an unsupported library version is provided', () => {
      expect(() => {
        AutoComplete({
          version: 3
        });
      }).toThrow(AutoCompleteError.UNSUPPORTED_LIBRARY_VERSION);
    });
  });
});
