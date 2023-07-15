import {
  DIRTY_PREFIX,
  DIRTY_REGEX,
  DIRTY_REGEX_G,
  DIRTY_SEPERATOR_REGEX_G,
} from '../constants';

export const createDocumentFragment = () => {
  return document.createDocumentFragment();
};

export const htmlToDOM = (html: string) => {
  const parser = new DOMParser();

  const document = parser.parseFromString(html, 'text/html');
  console.log(document);

  return document.body.firstChild;
};

const buildDocumentFragmentWith = (str?: string) => {
  const $df = document.createDocumentFragment();
  if (!str) {
    return $df;
  }
  $df.append(document.createTextNode(str));
  return $df;
};

const handleTextNode = (node: Node, ...args: unknown[]) => {
  const texts = node.textContent?.split(DIRTY_SEPERATOR_REGEX_G);

  if (texts === undefined) {
    return;
  }

  const $doms = texts.map((text) => {
    const dirtyIndex = DIRTY_REGEX.exec(text)?.[1];
    if (!dirtyIndex) {
      return document.createTextNode(text);
    }

    const arg = args[Number(dirtyIndex)];
    if (arg instanceof Node) {
      return arg;
    }
    if (arg instanceof Array) {
      const df = document.createDocumentFragment();
      arg.forEach(($el) => df.append($el));
      return df;
    }
    return buildDocumentFragmentWith(arg as string);
  });

  for (const $dom of $doms) {
    node.parentNode?.insertBefore($dom, node);
  }

  node.nodeValue = '';
};

export const sanitizeDOM = (element: HTMLElement, args: unknown[]) => {
  const replaceAttribute = (name: string, value: any, element: HTMLElement) => {
    if (typeof value === 'function') {
      element.addEventListener(name.replace('on', '').toLowerCase(), value);
      element.removeAttribute(name);
    } else if (['string', 'number'].includes(typeof value)) {
      const attribute = element.getAttribute(name);
      const replacedAttribute = attribute?.replace(
        DIRTY_REGEX_G,
        (match: string, index: string) => {
          const replacement = args[Number(index)];
          if (typeof replacement === 'string') {
            return replacement;
          } else if (typeof replacement === 'number') {
            return `${replacement}`;
          }
          return '';
        },
      );
      element.setAttribute(name, replacedAttribute ?? '');
    } else if (typeof value === 'boolean') {
      if (value === true) {
        element.setAttribute(name, '');
      } else {
        element.removeAttribute(name);
      }
    }
  };

  const walker = document.createNodeIterator(element, NodeFilter.SHOW_ALL);

  let node;
  while ((node = walker.nextNode())) {
    if (
      node.nodeType === Node.TEXT_NODE &&
      node.nodeValue?.includes(DIRTY_PREFIX)
    ) {
      handleTextNode(node);
      continue;
    }

    node = <HTMLElement>node;

    let attributes: Attr[] = Array.from(node.attributes ?? []);

    for (const { name, value } of attributes) {
      if (name && value.includes(DIRTY_PREFIX)) {
        const match = DIRTY_REGEX.exec(value);
        if (!match) {
          continue;
        }

        const realValue = args[Number(match[1])];
        replaceAttribute(name, realValue, node);
      }
    }
  }
};
