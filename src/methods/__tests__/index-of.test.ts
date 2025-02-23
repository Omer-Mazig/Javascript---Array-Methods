import "../index-of";

describe("Array.prototype.myIndexOf", () => {
  test("finds index of simple element", () => {
    const array = [1, 2, 3, 4, 2];
    const nativeResult = array.indexOf(2);
    const result = array.myIndexOf(2);
    expect(result).toBe(nativeResult);
  });

  test("returns -1 when element not found", () => {
    const array = [1, 2, 3];
    const nativeResult = array.indexOf(4);
    const result = array.myIndexOf(4);
    expect(result).toBe(nativeResult);
  });

  test("handles fromIndex parameter", () => {
    const array = [1, 2, 3, 4, 2];
    const nativeResult = array.indexOf(2, 2);
    const result = array.myIndexOf(2, 2);
    expect(result).toBe(nativeResult);
  });

  test("handles negative fromIndex", () => {
    const array = [1, 2, 3, 4, 2];
    const nativeResult = array.indexOf(2, -2);
    const result = array.myIndexOf(2, -2);
    expect(result).toBe(nativeResult);
  });

  test("handles fromIndex greater than array length", () => {
    const array = [1, 2, 3];
    const nativeResult = array.indexOf(2, 5);
    const result = array.myIndexOf(2, 5);
    expect(result).toBe(nativeResult);
  });

  test("handles sparse arrays", () => {
    const array = [1, 2, 3, , 5];
    const nativeResult = array.indexOf(undefined);
    const result = array.myIndexOf(undefined);
    expect(result).toBe(nativeResult);
  });

  test("distinguishes between undefined and empty slots", () => {
    const array = [1, undefined, 3];
    const nativeResult = array.indexOf(undefined);
    const result = array.myIndexOf(undefined);
    expect(result).toBe(nativeResult);
  });

  test("uses strict equality comparison", () => {
    const array = [0, "0", false, null, undefined];
    array.forEach((item) => {
      const nativeResult = array.indexOf(item);
      const result = array.myIndexOf(item);
      expect(result).toBe(nativeResult);
    });
  });

  test("should handle fromIndex type coercion", () => {
    const array = [1, 2, 3, 4, 5];
    // @ts-ignore
    expect(array.myIndexOf(1, [])).toBe(array.indexOf(1, []));
    // @ts-ignore
    expect(array.myIndexOf(1, [1])).toBe(array.indexOf(1, [1]));
    // @ts-ignore
    expect(array.myIndexOf(1, [-1])).toBe(array.indexOf(1, [-1]));
    // @ts-ignore
    expect(array.myIndexOf(1, [1, 2])).toBe(array.indexOf(1, [1, 2]));
    // @ts-ignore
    expect(array.myIndexOf(1, [""])).toBe(array.indexOf(1, [""]));
    // @ts-ignore
    expect(array.myIndexOf(1, ["baba"])).toBe(array.indexOf(1, ["baba"]));
    // @ts-ignore
    expect(array.myIndexOf(1, ["2"])).toBe(array.indexOf(1, ["2"]));
  });
});
