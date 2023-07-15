import { describe, expect, it } from 'vitest';
import { createDocumentFragment } from './dom';

describe('Handling DOM.', () => {
  it('createDocumentFragment function creates DocumentFragment properly.', () => {
    const $dom = createDocumentFragment();
    expect($dom).toBeInstanceOf(DocumentFragment);
  });
});
