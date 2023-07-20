import { describe, expect, it } from 'vitest';
import { htmlToDOM } from './dom';

describe('htmlToDOM Function', () => {
  it('should return a HTMLDivElement', () => {
    const $dom = htmlToDOM('<div>Hello World</div>');
    console.log($dom);
    expect($dom).toBeInstanceOf(HTMLDivElement);
  });

  it('can handle complex DOM Element', () => {
    const $dom = htmlToDOM(`
      <div>
        ${Array(100).fill('<div>hello</div>').join('')}
      </div>
    `);

    expect($dom?.childNodes.length).toBe(102);
  });
});
