import { helper } from '@ember/component/helper';

export function isString([arg]) {
  return typeof arg === "string";
}

export default helper(isString);
