import {
  htmlToDOM,
  sanitizeDOM,
  unstableSanitizeVirtualDOM,
} from './utils/dom';
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
) => {
  const html = stringConcatenation(strings, ...args).trim();
  const $dom = htmlToDOM(html);

  if ($dom === null) {
    throw new Error('Invalid HTML string');
  }

  const $fragment = document.createDocumentFragment();
  $fragment.append($dom);
  // if first child is text node, return it.
  // if ($fragment.firstChild instanceof Text) {
  // return $fragment.firstChild.textContent || '';
  // }

  // sanitizeDOM($fragment, args);
  unstableSanitizeVirtualDOM($fragment, args);
  // if first child is not text node, return child nodes -> first index.
  return $fragment.firstElementChild || $fragment;
};
