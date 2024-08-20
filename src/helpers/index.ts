export function valueOrDefault(value: string | undefined, defaultWhenUndefined: string = '') {
  if (value === undefined) {
    return defaultWhenUndefined;
  }
  return value;
}
