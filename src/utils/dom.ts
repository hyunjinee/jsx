export const createFragment = () => {
  return document.createDocumentFragment();
};

export const handleTextNode = () => {};

const HTMLToDOM = (html: string) => {
  const parser = new DOMParser();

  const document = parser.parseFromString(html, 'text/html');
  console.log(document);

  return document.body.firstChild;
};
