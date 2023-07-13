import { describe, expect, it } from "vitest";
import jsx from "./index";

describe("Create DOM properly.", () => {
  it("should pass ci", () => {
    expect(1).toBe(1);
  });

  it("should return a DOM element", () => {
    const $dom = jsx`
      <div>Hello World</div>
    `;

    expect($dom).toBeInstanceOf(HTMLElement);
  });
});
