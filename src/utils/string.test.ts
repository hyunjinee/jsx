import { describe, expect, it } from 'vitest';
import { stringConcatenation } from './string';

describe('String Concatenation', () => {
  it('stringConcatenation function should combine string properly.', () => {
    const string = stringConcatenation`
      <div>Hello World</div>
      <div>Hello From Korea</div>
    `;

    expect(string).toContain(
      '<div>Hello World</div>\n      <div>Hello From Korea</div>',
    );
  });

  it('stringConcatenation function should combine string with args properly.(if arg is string)', () => {
    const hello = 'Hello From Korea';
    const string = stringConcatenation`
      <div>${hello}</div>
    `;

    expect(string).toContain('<div>Hello From Korea</div>');
  });

  it('stringConcatenation function should combine string with args properly.(if arg is number)', () => {
    const number = 123;
    const string = stringConcatenation`
      <div>${number}</div>
    `;

    expect(string).toContain('dirtyindex:0:');
  });

  it('stringConcatenation function should combine string with args properly.(if arg is object)', () => {
    const object = { name: 'hyunjin' };
    const string = stringConcatenation`
      <div>${object}</div>
    `;

    expect(string).toContain('dirtyindex:0:');
  });

  it('stringConcatenation function should combine string with args properly.(multiple args)', () => {
    const numbers = Array.from({ length: 10 }, (_, index) => index);
    const string = stringConcatenation`
      <div>
        ${numbers.map((number) => `<div>${number}</div>`).join('')}
      </div> 
    `;

    for (const number of numbers) {
      expect(string).toContain(`<div>${number}</div>`);
    }
  });

  it('stringConcatenation function should combine with args properly.(args -> null, undefined)', () => {
    const string = stringConcatenation`
      <div>${null}, ${undefined}</div>
    `;

    expect(string).toEqual('<div>, </div>');
  });
});
