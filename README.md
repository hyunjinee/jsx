# `@hyunjin/jsx`

JSX is a JavaScript XML syntax extension that allows you to write HTML-like code in JavaScript. This package provides a tagged template literal that converts JSX into a InMemory DOM.

## Installation

```sh
npm install @hyunjin/jsx
```

## Example

```ts
import jsx from '@hyunjin/jsx';

const $dom = jsx`
  <button onClick=${() => console.log('hello world')}>
    <span>Click me!</span>
  </button>
`;
```

## Reference

- [facebook JSX](https://github.com/facebook/jsx)
- [woowahan-jsx](https://github.com/woowa-techcamp-2021/woowahan-jsx)
