import "../at";

describe("Array.prototype.myAt", () => {
  test("returns element at positive index", () => {
    const array = [1, 2, 3, 4, 5];
    const nativeResult = array.at(2);
    const result = array.myAt(2);
    expect(result).toBe(nativeResult);
  });

  test("returns element at negative index", () => {
    const array = [1, 2, 3, 4, 5];
    const nativeResult = array.at(-2);
    const result = array.myAt(-2);
    expect(result).toBe(nativeResult);
  });

  test("returns undefined for out of bounds positive index", () => {
    const array = [1, 2, 3];
    const nativeResult = array.at(5);
    const result = array.myAt(5);
    expect(result).toBe(nativeResult);
  });

  test("returns undefined for out of bounds negative index", () => {
    const array = [1, 2, 3];
    const nativeResult = array.at(-5);
    const result = array.myAt(-5);
    expect(result).toBe(nativeResult);
  });

  test("handles empty arrays", () => {
    const array: number[] = [];
    const nativeResult = array.at(0);
    const result = array.myAt(0);
    expect(result).toBe(nativeResult);
  });

  test("handles sparse arrays", () => {
    const array = [1, , 3];
    const nativeResult = array.at(1);
    const result = array.myAt(1);
    expect(result).toBe(nativeResult);
  });

  test("handles different types of arrays", () => {
    const stringArray = ["a", "b", "c"];
    expect(stringArray.myAt(1)).toBe("b");

    const mixedArray = [1, "a", { x: 1 }, [2, 3], null, undefined];
    expect(mixedArray.myAt(2)).toEqual({ x: 1 });
    expect(mixedArray.myAt(-2)).toBe(null);
    expect(mixedArray.myAt(-1)).toBe(undefined);
  });

  test("handles numeric string indices", () => {
    const array = [1, 2, 3];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt("1")).toBe(2);
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt("-2")).toBe(2);
  });

  test("handles array-like objects", () => {
    const arrayLike = {
      0: "a",
      1: "b",
      2: "c",
      length: 3,
    };
    const result = Array.prototype.myAt.call(arrayLike, 1);
    const nativeResult = Array.prototype.at.call(arrayLike, 1);
    expect(result).toBe(nativeResult);
  });

  test("handles non-numeric indices", () => {
    const array = [1, 2, 3];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt(undefined)).toBe(array.at(undefined));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt(null)).toBe(array.at(null));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt("abc")).toBe(array.at("abc"));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt({})).toBe(array.at({}));
  });

  test("handles floating point indices", () => {
    const array = [1, 2, 3, 4, 5];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt(1.5)).toBe(array.at(1.5));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt(-1.5)).toBe(array.at(-1.5));
  });

  test("handles very large indices", () => {
    const array = [1, 2, 3];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt(Number.MAX_SAFE_INTEGER)).toBe(
      array.at(Number.MAX_SAFE_INTEGER)
    );
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt(-Number.MAX_SAFE_INTEGER)).toBe(
      array.at(-Number.MAX_SAFE_INTEGER)
    );
  });

  test("handles array as argument", () => {
    const array = [1, 2, 3];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt([4])).toBe(array.at([4]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt([4, 5, 6])).toBe(array.at([4, 5, 6]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt([])).toBe(array.at([]));
  });

  test("returns first element when no argument is provided", () => {
    const array = [1, 2, 3];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.myAt()).toBe(array.at());
  });
});
