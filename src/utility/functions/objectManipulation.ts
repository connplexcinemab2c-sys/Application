import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import lowerFirst from 'lodash/lowerFirst';
import camelCase from 'lodash/camelCase';
import {ListIteratee, snakeCase} from 'lodash';

const mapKeysDeep =
  (cb: ListIteratee<unknown>) =>
  (obj: unknown): unknown => {
    if (!isPlainObject(obj)) return obj;
    return mapValues(mapKeys(obj as never, cb), val => {
      if (isPlainObject(val)) return mapKeysDeep(cb)(val);
      if (isArray(val)) return map(val, v => mapKeysDeep(cb)(v));
      return val;
    });
  };

export const cameliseDeep = <T>(value: unknown): T => {
  const cameliseFn: ListIteratee<unknown> = (_, key: string): string =>
    lowerFirst(camelCase(key));
  return isArray(value)
    ? (value.map(mapKeysDeep(cameliseFn)) as unknown as T)
    : (mapKeysDeep(cameliseFn)(value) as T);
};

export const snakeCaseDeep = <T>(value: unknown): T => {
  const snakeCaseFn: ListIteratee<unknown> = (_, key: string): string =>
    snakeCase(key);
  return isArray(value)
    ? (value.map(mapKeysDeep(snakeCaseFn)) as unknown as T)
    : (mapKeysDeep(snakeCaseFn)(value) as T);
};
