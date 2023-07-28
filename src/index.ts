import { sanitizeDOM } from './utils/dom';
import { stringConcatenation } from './utils/string';

const jsx = (strings: TemplateStringsArray, ...args: unknown[]) => {
  const html = stringConcatenation(strings, ...args);
  const $template = document.createElement('frame');
  $template.innerHTML = html;

  // clean up dirty strings.
  sanitizeDOM($template, args);

  return $template.firstElementChild || $template;
};

export default jsx;

export const unstable_jsx = (
  strings: TemplateStringsArray,
  ...args: unknown[]
) => {};
