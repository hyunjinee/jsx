export const createDocumentFragment = () => {
  return document.createDocumentFragment();
};

export const handleTextNode = () => {};

export const htmlToDOM = (html: string) => {
  const parser = new DOMParser();

  const document = parser.parseFromString(html, 'text/html');
  console.log(document);

  return document.body.firstChild;
};
