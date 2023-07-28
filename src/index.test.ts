/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';

import jsx, { unstable_jsx } from '.';

describe('JSX', () => {
  it('should return a DOM element', () => {
    const $dom = jsx`
      <div>Hello World</div>
    `;

    expect($dom).toBeInstanceOf(HTMLDivElement);
    expect($dom.textContent?.trim()).toBe('Hello World');
  });

  it('should return a text', () => {
    const $dom = jsx`
      Hello World
    `;

    expect($dom.textContent?.trim()).toBe('Hello World');
  });

  it('should render img tag', () => {
    const $dom = jsx`
      <img src="https://via.placeholder.com/150" alt="placeholder" />
    `;

    expect($dom).toBeInstanceOf(HTMLImageElement);
  });

  it('can contain inner DOM', () => {
    const $innerDOM = jsx`<div>inner</div>`;
    const $outerDOM = jsx`<div>outer ${$innerDOM}</div>`;

    expect($outerDOM).toContain($innerDOM);
  });

  it('can handle event', () => {
    const onClick = vi.fn();
    const $div = jsx`
      <div onclick=${onClick}></div>
    `;

    $div.dispatchEvent(new Event('click'));

    expect(onClick).toBeCalledTimes(1);
  });
});

describe('unstable_jsx', () => {
  it('should trim unnecessary space', () => {
    const text = unstable_jsx`hi               `;
    console.log(text, '?#');
    expect(text).toBe('hi');
  });

  it('should return a DOM element', () => {
    const $dom = unstable_jsx`
      <div>Hello World</div>
    `;

    expect($dom).toBeInstanceOf(HTMLDivElement);

    // Array.from($dom).forEach((node) => {
    //   console.log(node);
    // });

    // console.log($dom, '#$');
    // expect($dom.)
    // expect).toBe('Hello World');
    // expect().toBe('Hello World');
  });
});
