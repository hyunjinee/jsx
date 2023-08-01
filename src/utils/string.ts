import { DIRTY_PREFIX } from '../constants';

export const stringConcatenation = (
  strings: TemplateStringsArray,
  ...args: unknown[]
) =>
  strings
    .reduce((acc, curr, index) => {
      acc += curr;

      if (typeof args[index] === 'undefined' || args[index] === null) {
        return acc;
      }

      if (typeof args[index] === 'string') {
        acc += args[index];
      } else {
        acc += `${DIRTY_PREFIX}${index}:`;
      }

      return acc;
    }, '')
    .trim();
