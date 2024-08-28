import { describe } from '@jest/globals';
import { getAutoCompleteDetails } from '../src';

// These are config loading tests
describe('Test the library is able to be imported', () => {
  describe('test the libray entry point', () => {
    it('provides a function', () => {
      expect(getAutoCompleteDetails).toBeInstanceOf(Function);
    });
  });
});
