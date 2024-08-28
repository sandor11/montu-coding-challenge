import { describe } from '@jest/globals';
import { AutoComplete } from '../src';

// These are config loading tests
describe('Test the library is able to be imported', () => {
  describe('test the libray entry point', () => {
    it('provides a function to create an AutoComplete object', () => {
      expect(AutoComplete).toBeInstanceOf(Function);
    });

    it('provides a object to search for address suggestions', () => {
      const autoComplete = AutoComplete({ version: 1 });
      expect(autoComplete).toBeInstanceOf(Object);
      expect(autoComplete).toHaveProperty('search');
      expect(autoComplete).toHaveProperty('version');
    });
  });
});
