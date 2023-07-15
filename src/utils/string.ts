import { DIRTY_PREFIX } from '../constants';

export const stringConcatenation = (
  strings: TemplateStringsArray,
  ...args: unknown[]
) => {
  return strings.reduce((acc, curr, index) => {
    acc += curr;

    if (typeof args[index] === 'undefined') {
      return acc;
    }

    if (typeof args[index] === 'string') {
      acc += args[index];
    } else {
      acc += `${DIRTY_PREFIX}${index}:`;
    }

    return acc;
  }, '');
};
