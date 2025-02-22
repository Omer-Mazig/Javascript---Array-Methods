import "../slice";

describe("Array.prototype.mySlice", () => {
  it("should work like Array.prototype.slice", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.mySlice()).toEqual(array.slice());
    expect(array.mySlice(2)).toEqual(array.slice(2));
    expect(array.mySlice(1, 3)).toEqual(array.slice(1, 3));
  });

  it("should handle basic slicing operations", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.mySlice(0, 2)).toEqual([1, 2]); // First two elements
    expect(array.mySlice(2, 4)).toEqual([3, 4]); // Middle elements
    expect(array.mySlice(4, 5)).toEqual([5]); // Last element
  });

  const array = [1, 2, 3, 4, 5];

  it("should handle slicing with only start parameter", () => {
    const array = [1, 2, 3, 4, 5];
    expect(array.mySlice(0)).toEqual([1, 2, 3, 4, 5]);
    expect(array.mySlice(1)).toEqual([2, 3, 4, 5]);
    expect(array.mySlice(4)).toEqual([5]);
    expect(array.mySlice(5)).toEqual([]);
  });

  it("should handle array-like objects", () => {
    const arrayLikeObj = {
      0: "a",
      1: "b",
      2: "c",
      length: 3,
    };
    const result = Array.prototype.mySlice.call(arrayLikeObj, 1);
    expect(result).toEqual(["b", "c"]);
  });

  it("should return a shallow copy with positive indices", () => {
    expect(array.mySlice(1, 3)).toEqual([2, 3]);
    expect(array.mySlice(0, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(array.mySlice(2)).toEqual([3, 4, 5]);
  });

  it("should handle negative start index", () => {
    expect(array.mySlice(-2)).toEqual([4, 5]);
    expect(array.mySlice(-3, 4)).toEqual([3, 4]);
    expect(array.mySlice(-5)).toEqual([1, 2, 3, 4, 5]);
    expect(array.mySlice(-6)).toEqual([1, 2, 3, 4, 5]); // If start < -array.length, use 0
  });

  it("should handle negative end index", () => {
    expect(array.mySlice(0, -1)).toEqual([1, 2, 3, 4]);
    expect(array.mySlice(1, -2)).toEqual([2, 3]);
    expect(array.mySlice(0, -5)).toEqual([]);
    expect(array.mySlice(0, -6)).toEqual([]); // If end < -array.length, return empty array
  });

  it("should handle both negative indices", () => {
    expect(array.mySlice(-3, -1)).toEqual([3, 4]);
    expect(array.mySlice(-4, -2)).toEqual([2, 3]);
    expect(array.mySlice(-2, -1)).toEqual([4]);
  });

  it("should handle edge cases", () => {
    expect(array.mySlice()).toEqual([1, 2, 3, 4, 5]); // No parameters
    expect(array.mySlice(3, 2)).toEqual([]); // Start > end
    expect(array.mySlice(5, 6)).toEqual([]); // Start >= array.length
    expect([].mySlice()).toEqual([]); // Empty array
    expect(array.mySlice(0, 10)).toEqual([1, 2, 3, 4, 5]); // End > array.length
  });

  it("should not modify the original array", () => {
    const original = [1, 2, 3, 4, 5];
    const sliced = original.mySlice(1, 3);
    expect(original).toEqual([1, 2, 3, 4, 5]);
    expect(sliced).toEqual([2, 3]);
  });

  it("should create a shallow copy of objects in array", () => {
    const objArray = [{ a: 1 }, { b: 2 }, { c: 3 }];
    const sliced = objArray.mySlice(1, 2);
    expect(sliced).toEqual([{ b: 2 }]);
    expect(sliced[0]).toBe(objArray[1]); // Same reference
  });

  it("should handle different array types", () => {
    const stringArray = ["a", "b", "c", "d", "e"];
    expect(stringArray.mySlice(1, 3)).toEqual(["b", "c"]);
    expect(stringArray.mySlice(2)).toEqual(["c", "d", "e"]);

    const mixedArray = [1, "a", { x: 1 }, [2, 3], null, undefined];
    expect(mixedArray.mySlice(2, 4)).toEqual([{ x: 1 }, [2, 3]]);
    expect(mixedArray.mySlice(4)).toEqual([null, undefined]);
  });

  it("should handle sparse arrays", () => {
    // eslint-disable-next-line no-sparse-arrays
    const sparseArray = [1, , 3, , 5];
    const sliced = sparseArray.mySlice(0);
    expect(sliced).toHaveLength(5);
    expect(0 in sliced).toBe(true);
    expect(1 in sliced).toBe(false);
    expect(2 in sliced).toBe(true);
    expect(3 in sliced).toBe(false);
    expect(4 in sliced).toBe(true);
  });

  it("should handle numeric strings and arrays as indices", () => {
    const array = [1, 2, 3, 4, 5];

    // Numeric strings
    // @ts-ignore
    expect(array.mySlice("2")).toEqual([3, 4, 5]);
    // @ts-ignore
    expect(array.mySlice("1", "3")).toEqual([2, 3]);

    // Arrays with single numeric item
    // @ts-ignore
    expect(array.mySlice([2])).toEqual([3, 4, 5]);
    // @ts-ignore
    expect(array.mySlice([1], [3])).toEqual([2, 3]);

    // Arrays with single numeric string
    // @ts-ignore
    expect(array.mySlice(["2"])).toEqual([3, 4, 5]);
    // @ts-ignore
    expect(array.mySlice(["1"], ["3"])).toEqual([2, 3]);

    // Other values should be converted to 0
    // @ts-ignore
    expect(array.mySlice({})).toEqual([1, 2, 3, 4, 5]);
    // @ts-ignore
    expect(array.mySlice([null])).toEqual([1, 2, 3, 4, 5]);
    // @ts-ignore
    expect(array.mySlice(["abc"])).toEqual([1, 2, 3, 4, 5]);
    // @ts-ignore
    expect(array.mySlice([1, 2])).toEqual([1, 2, 3, 4, 5]); // More than one item
  });
});
