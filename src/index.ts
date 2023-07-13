const jsx = (strings: TemplateStringsArray, ...args: unknown[]) => {
  // return document.createElement("div");
  // console.log(strings, args);

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

  return $fragment.firstElementChild || $fragment;
};
export default jsx;

const a = jsx`
  <div>${1} <i>Hello world</i></div>    
`;

console.log(a);

document.body.appendChild(a);
