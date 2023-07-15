/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';

import jsx from '../src';

describe('Create DOM properly.', () => {
  it('should pass ci', () => {
    expect(1).toBe(1);
  });

  it('should return a DOM element', () => {
    const $dom = jsx`
      <div>Hello World</div>
    `;

    expect($dom).toBeInstanceOf(HTMLDivElement);
  });

  it('should return a DOM element with text', () => {});

  it('should render img tag', () => {
    const $dom = jsx`
      <img src="https://via.placeholder.com/150" alt="placeholder" />
    `;

    expect($dom).toBeInstanceOf(HTMLImageElement);
  });

  it('can contain ', () => {
    const $innerDOM = jsx`<div>inner</div>`;
    const $outerDOM = jsx`<div>outer ${$innerDOM}</div>`;

    expect($outerDOM).toContain($innerDOM);
  });
});
