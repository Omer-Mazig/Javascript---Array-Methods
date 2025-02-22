import "../slice";

describe("Array.prototype.mySlice", () => {
  test("basic slicing operations match native slice", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.mySlice()).toEqual(array.slice());
    expect(array.mySlice(2)).toEqual(array.slice(2));
    expect(array.mySlice(1, 3)).toEqual(array.slice(1, 3));
    expect(array.mySlice(0, 2)).toEqual(array.slice(0, 2));
    expect(array.mySlice(2, 4)).toEqual(array.slice(2, 4));
    expect(array.mySlice(4, 5)).toEqual(array.slice(4, 5));
  });

  test("handles negative indices like native slice", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.mySlice(-2)).toEqual(array.slice(-2));
    expect(array.mySlice(-3, 4)).toEqual(array.slice(-3, 4));
    expect(array.mySlice(1, -2)).toEqual(array.slice(1, -2));
    expect(array.mySlice(-3, -1)).toEqual(array.slice(-3, -1));
    expect(array.mySlice(-6)).toEqual(array.slice(-6));
    expect(array.mySlice(0, -6)).toEqual(array.slice(0, -6));
  });

  test("handles edge cases like native slice", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.mySlice(3, 2)).toEqual(array.slice(3, 2));
    expect(array.mySlice(5, 6)).toEqual(array.slice(5, 6));
    expect(array.mySlice(0, 10)).toEqual(array.slice(0, 10));
    expect([].mySlice()).toEqual([].slice());
  });

  test("creates shallow copy like native slice", () => {
    const objArray = [{ a: 1 }, { b: 2 }, { c: 3 }];
    const mySliced = objArray.mySlice(1, 2);
    const nativeSliced = objArray.slice(1, 2);
    expect(mySliced).toEqual(nativeSliced);
    expect(mySliced[0]).toBe(objArray[1]); // Same reference
  });

  test("handles different types of arrays like native slice", () => {
    const stringArray = ["a", "b", "c", "d", "e"];
    expect(stringArray.mySlice(1, 3)).toEqual(stringArray.slice(1, 3));

    const mixedArray = [1, "a", { x: 1 }, [2, 3], null, undefined];
    expect(mixedArray.mySlice(2, 4)).toEqual(mixedArray.slice(2, 4));
  });

  test("handles sparse arrays like native slice", () => {
    // eslint-disable-next-line no-sparse-arrays
    const sparseArray = [1, , 3, , 5];
    expect(sparseArray.mySlice()).toEqual(sparseArray.slice());
    expect(sparseArray.mySlice(1, 4)).toEqual(sparseArray.slice(1, 4));
  });

  test("handles array-like objects like native slice", () => {
    const arrayLikeObj = {
      0: "a",
      1: "b",
      2: "c",
      length: 3,
    };
    const myResult = Array.prototype.mySlice.call(arrayLikeObj, 1);
    const nativeResult = Array.prototype.slice.call(arrayLikeObj, 1);
    expect(myResult).toEqual(nativeResult);
  });

  test("handles numeric strings and arrays as indices like native slice", () => {
    const array = [1, 2, 3, 4, 5];

    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice("2")).toEqual(array.slice("2"));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice("1", "3")).toEqual(array.slice("1", "3"));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice([2])).toEqual(array.slice([2]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice([1], [3])).toEqual(array.slice([1], [3]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice(["2"])).toEqual(array.slice(["2"]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice({})).toEqual(array.slice({}));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice([null])).toEqual(array.slice([null]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice(["abc"])).toEqual(array.slice(["abc"]));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice([1, 2])).toEqual(array.slice([1, 2]));
  });

  test("handles floating point indices like native slice", () => {
    const array = [1, 2, 3, 4, 5];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice(1.5)).toEqual(array.slice(1.5));
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice(1.5, 3.7)).toEqual(array.slice(1.5, 3.7));
  });

  test("handles very large indices like native slice", () => {
    const array = [1, 2, 3];
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice(Number.MAX_SAFE_INTEGER)).toEqual(
      array.slice(Number.MAX_SAFE_INTEGER)
    );
    // @ts-ignore - Testing JavaScript runtime behavior
    expect(array.mySlice(-Number.MAX_SAFE_INTEGER)).toEqual(
      array.slice(-Number.MAX_SAFE_INTEGER)
    );
  });
});
