import { describe } from '@jest/globals';
import { valueOrDefault } from '../src/helpers';

type OptionalProperty = {
  value?: string;
};

function getWithUndefined(): OptionalProperty {
  return {};
}

// These are config loading tests
describe('Test helper function', () => {
  describe('valueOrDefault', () => {
    it('gives back the value when supplied', () => {
      expect(valueOrDefault('this is fine')).toBe('this is fine');
    });

    it('gives back an empty string when undefined and no default is provided', () => {
      expect(valueOrDefault(getWithUndefined().value)).toBe('');
    });

    it('gives back an the default that was provided when undefined', () => {
      expect(valueOrDefault(getWithUndefined().value, 'default')).toBe('default');
    });
  });
});
