/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';

import jsx from '../src/index';

describe('Event', () => {
  it('should handle event', () => {
    const onClick = vi.fn();
    const $div = jsx`
      <div onclick=${onClick}></div>
    `;

    $div.dispatchEvent(new Event('click'));

    expect(onClick).toBeCalledTimes(1);
    console.log($div, '?');
  });
});
