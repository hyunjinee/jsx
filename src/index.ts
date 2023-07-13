const jsx = (strings: TemplateStringsArray, ...args: unknown[]) => {
  // use fragment as a Container
  const $fragment = document.createElement("fragment");

  const $dom = strings
    .map((str, index) => {
      const argsString = args.length > index ? index : "";
      console.log(argsString);

      return `${str}${argsString}`;
    })
    .join("");

  $fragment.innerHTML = $dom;
  console.log($dom, "$dom");
  console.log($fragment);

  const walker = document.createNodeIterator($fragment, NodeFilter.SHOW_ALL);

  let node;
  while ((node = walker.nextNode())) {
    // console.log(node);
    if (node.nodeType === Node.TEXT_NODE) {
      // console.log("text Node:", node);
      handleTextNode(node);
    }
  }

  return $fragment.firstElementChild || $fragment;
};

export default jsx;

const handleTextNode = (node: Node) => {
  const text = node.textContent;
};

const hello = "world";
const a = jsx`
  <img src="https://via.placeholder.com/150" alt="placeholder" />  
`;

document.body.appendChild(a);
