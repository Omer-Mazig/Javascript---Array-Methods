import "../includes";

declare global {
  interface Array<T> {
    myIncludes(searchElement: T, fromIndex?: number): boolean;
  }
}

describe("myIncludes", () => {
  it("should find existing elements", () => {
    const array = [1, 2, 3];
    expect(array.myIncludes(2)).toBe(array.includes(2));
    expect(array.myIncludes(4)).toBe(array.includes(4));
  });

  it("should work with fromIndex parameter", () => {
    const array = ["a", "b", "c"];
    expect(array.myIncludes("a", 1)).toBe(array.includes("a", 1));
    expect(array.myIncludes("b", 1)).toBe(array.includes("b", 1));
  });

  it("should handle negative fromIndex", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.myIncludes(4, -2)).toBe(array.includes(4, -2));
    expect(array.myIncludes(2, -2)).toBe(array.includes(2, -2));
  });

  it("should handle fromIndex greater than array length", () => {
    const array = [1, 2, 3];
    expect(array.myIncludes(3, 5)).toBe(array.includes(3, 5));
  });

  it("should handle NaN values", () => {
    const array = [1, NaN, 2];
    expect(array.myIncludes(NaN)).toBe(array.includes(NaN));
  });

  it("should use strict equality for comparison", () => {
    const array = [1, "1", 2];
    expect(array.myIncludes(1)).toBe(array.includes(1));
    expect(array.myIncludes("1")).toBe(array.includes("1"));
  });

  it("should work with array-like objects", () => {
    const arrayLike = {
      length: 3,
      0: "a",
      1: "b",
      2: "c",
    };

    expect(Array.prototype.myIncludes.call(arrayLike, "b")).toBe(
      Array.prototype.includes.call(arrayLike, "b")
    );
  });

  it("should handle sparse arrays", () => {
    const sparseArray = [1, , 3];

    expect(sparseArray.myIncludes(undefined)).toBe(
      sparseArray.includes(undefined)
    );
  });

  it("should work with empty arrays", () => {
    const empty = [];
    expect(empty.myIncludes(1)).toBe(empty.includes(1));
  });

  it("should handle objects and references", () => {
    const obj = { a: 1 };
    const arr = [obj];
    const similar = { a: 1 };

    expect(arr.myIncludes(obj)).toBe(arr.includes(obj));
    expect(arr.myIncludes(similar)).toBe(arr.includes(similar));
  });

  it("should handle null and undefined values", () => {
    const array = [null, undefined];
    expect(array.myIncludes(null)).toBe(array.includes(null));
    expect(array.myIncludes(undefined)).toBe(array.includes(undefined));
  });

  it("should handle very large fromIndex values", () => {
    const array = [1, 2, 3];
    expect(array.myIncludes(1, Number.MAX_SAFE_INTEGER)).toBe(
      array.includes(1, Number.MAX_SAFE_INTEGER)
    );
    expect(array.myIncludes(1, -Number.MAX_SAFE_INTEGER)).toBe(
      array.includes(1, -Number.MAX_SAFE_INTEGER)
    );
  });

  it("should handle non-integer fromIndex values", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.myIncludes(3, 1.5)).toBe(array.includes(3, 1.5));
    expect(array.myIncludes(3, -1.5)).toBe(array.includes(3, -1.5));
  });

  it("should handle -0 and +0 as equal", () => {
    const array = [+0];
    expect(array.myIncludes(-0)).toBe(array.includes(-0));

    const array2 = [-0];
    expect(array2.myIncludes(+0)).toBe(array2.includes(+0));
  });

  it("should not treat false as 0", () => {
    const array = [0];
    // @ts-ignore
    expect(array.myIncludes(false)).toBe(array.includes(false));
  });

  it("should handle fromIndex type coercion", () => {
    const array = [1, 2, 3];
    // @ts-expect-error: Testing with string index
    expect(array.myIncludes(2, "1")).toBe(array.includes(2, "1"));
    // @ts-expect-error: Testing with boolean index
    expect(array.myIncludes(2, true)).toBe(array.includes(2, true));
    // @ts-expect-error: Testing with empty array
    expect(array.myIncludes(2, [])).toBe(array.includes(2, []));
    // @ts-expect-error: Testing with array containing number
    expect(array.myIncludes(2, [1])).toBe(array.includes(2, [1]));
    // @ts-expect-error: Testing with array containing string
    expect(array.myIncludes(2, ["1"])).toBe(array.includes(2, ["1"]));
    // @ts-expect-error: Testing with array containing multiple values
    expect(array.myIncludes(2, [1, 2])).toBe(array.includes(2, [1, 2]));
    // @ts-expect-error: Testing with nested arrays
    expect(array.myIncludes(2, [[1]])).toBe(array.includes(2, [[1]]));

    expect(array.myIncludes(2, NaN)).toBe(array.includes(2, NaN));
  });

  it("should handle array-like objects with missing indices", () => {
    const arrayLike = {
      length: 3,
      0: "a",
      // index 1 is missing
      2: "c",
    };

    expect(Array.prototype.myIncludes.call(arrayLike, undefined)).toBe(
      Array.prototype.includes.call(arrayLike, undefined)
    );
  });
});
