import "../concat";

describe("Array.prototype.myConcat", () => {
  // Basic cases
  test("concatenates two arrays", () => {
    const letters = ["a", "b", "c"];
    const numbers = [1, 2, 3];

    // @ts-ignore
    expect(letters.myConcat(numbers)).toEqual(["a", "b", "c", 1, 2, 3]);
  });

  test("concatenates three arrays", () => {
    const num1 = [1, 2, 3];
    const num2 = [4, 5, 6];
    const num3 = [7, 8, 9];

    expect(num1.myConcat(num2, num3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("concatenates values to an array", () => {
    const letters = ["a", "b", "c"];

    // @ts-ignore
    expect(letters.myConcat(1, [2, 3])).toEqual(["a", "b", "c", 1, 2, 3]);
  });

  // Edge cases
  test("returns shallow copy when no arguments provided", () => {
    const original = [1, 2, 3];
    const result = original.myConcat();

    expect(result).toEqual(original);
    expect(result).not.toBe(original); // Should be a new array
  });

  test("handles nested arrays with reference preservation", () => {
    const num1 = [[1]];
    const num2 = [2, [3]];
    // @ts-ignore
    const result = num1.myConcat(num2);

    expect(result).toEqual([[1], 2, [3]]);

    // Verify reference is preserved
    num1[0].push(4);
    expect(result[0]).toEqual([1, 4]);
  });

  test("handles sparse arrays", () => {
    const sparse1 = [1, , 3];
    const sparse2 = [4, , 6];

    expect(sparse1.myConcat(sparse2)).toEqual([1, , 3, 4, , 6]);
  });

  test("handles array-like objects with Symbol.isConcatSpreadable", () => {
    const arrayLike = {
      [Symbol.isConcatSpreadable]: true,
      length: 2,
      0: 1,
      1: 2,
      2: 99, // Should be ignored since length is 2
    };

    // @ts-ignore
    expect([0].myConcat(arrayLike)).toEqual([0, 1, 2]);
  });

  test("handles regular objects", () => {
    const obj = { 0: 1, 1: 2, length: 2 };

    // @ts-ignore
    expect([0].myConcat(obj)).toEqual([0, { 0: 1, 1: 2, length: 2 }]);
  });

  test("handles primitive values", () => {
    const arr = [1];
    // @ts-ignore
    expect(arr.myConcat(2, "three", true, null, undefined)).toEqual([
      1,
      2,
      "three",
      true,
      null,
      undefined,
    ]);
  });

  test("handles empty arrays", () => {
    expect([].myConcat([], [])).toEqual([]);
    expect([1].myConcat([], [])).toEqual([1]);
    // @ts-ignore
    expect([].myConcat([1], [2])).toEqual([1, 2]);
  });
});
