import { describe, expect, it } from 'vitest';
import { stringConcatenation } from './string';

describe('Handle String.', () => {
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

    console.log(string);
    expect(string).toContain('dirtyindex:0:');
  });
});
