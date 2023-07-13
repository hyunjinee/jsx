const TAGGED_TEMPLATE_LITERAL_PARAM_FLAG = "dirtyindex=";

const jsx = (strings: TemplateStringsArray, ...args: unknown[]) => {
  const html = stringToHTML(strings, ...args);
  const $dom = HTMLToDOM(html);
  console.log($dom);
  // use fragment as a Container
  const $fragment = document.createElement("fragment");
  $fragment.innerHTML = html;

  const walker = document.createNodeIterator($fragment, NodeFilter.SHOW_ALL);

  let node: Node | null | HTMLElement;
  while ((node = walker.nextNode())) {
    // console.log(node);
    if (node.nodeType === Node.TEXT_NODE) {
      // console.log("text Node:", node);
      const text = node.textContent;

      if (text?.includes(TAGGED_TEMPLATE_LITERAL_PARAM_FLAG)) {
        const realValueIndex = text.split("=")[1] as unknown as number;
        node.textContent = args[realValueIndex] as string;
      }
      handleTextNode(node);

      continue;
    }

    if (node instanceof HTMLElement) {
      const attributes = Array.from(node.attributes);

      attributes.forEach((attribute) => {
        const { name, value } = attribute;
        const realValueIndex = value.split("=")[1];
        const realValue = args[realValueIndex as unknown as number];
        if (name.startsWith("on") && node instanceof HTMLElement) {
          const eventName = name.slice(2).toLowerCase();
          node.addEventListener(eventName, realValue as EventListener);
          node.removeAttribute(name);
        }
      });
    }
  }

  return $fragment.firstElementChild || $fragment;
};

export default jsx;

const handleTextNode = (node: Node) => {
  const text = node.textContent;
};

const stringToHTML = (strings: TemplateStringsArray, ...args: unknown[]) => {
  return strings.reduce((acc, curr, index) => {
    acc += curr;

    if (typeof args[index] === "undefined") {
      return acc;
    }

    if (typeof args[index] === "string") {
      acc += args[index];
    } else {
      acc += `${TAGGED_TEMPLATE_LITERAL_PARAM_FLAG}${index}`;
    }

    return acc;
  }, "");
};

const HTMLToDOM = (html: string) => {
  const parser = new DOMParser();

  const document = parser.parseFromString(html, "text/html");
  console.log(document);

  return document.body.firstChild;
};

const hello = "world";
// const a = jsx`
//   <img src="https://via.placeholder.com/150" alt="placeholder" />
// `;

const a = jsx`
  <button onClick=${() => {
    console.log("hi");
  }}>${123}</button>
`;

document.body.appendChild(a);
