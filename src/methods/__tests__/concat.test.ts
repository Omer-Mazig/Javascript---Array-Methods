import "../concat";

describe("Array.prototype.myConcat", () => {
  test("concatenates two arrays", () => {
    const letters = ["a", "b", "c"];
    const numbers = [1, 2, 3];
    // @ts-ignore
    const nativeResult = letters.concat(numbers);
    // @ts-ignore
    const result = letters.myConcat(numbers);
    expect(result).toEqual(nativeResult);
  });

  test("concatenates multiple arrays", () => {
    const num1 = [1, 2, 3];
    const num2 = [4, 5, 6];
    const num3 = [7, 8, 9];
    const nativeResult = num1.concat(num2, num3);
    const result = num1.myConcat(num2, num3);
    expect(result).toEqual(nativeResult);
  });

  test("concatenates mixed values and arrays", () => {
    const letters = ["a", "b", "c"];
    // @ts-ignore
    const nativeResult = letters.concat(1, [2, 3], "d");
    // @ts-ignore
    const result = letters.myConcat(1, [2, 3], "d");
    expect(result).toEqual(nativeResult);
  });

  test("returns shallow copy when no arguments provided", () => {
    const original = [1, 2, 3];
    const nativeResult = original.concat();
    const result = original.myConcat();
    expect(result).toEqual(nativeResult);
    expect(result).not.toBe(original);
  });

  test("handles nested arrays with reference preservation", () => {
    const nested = [[1], [2, [3]]];
    const additional = [[4], 5];
    const nativeResult = nested.concat(additional);
    // @ts-ignore
    const result = nested.myConcat(additional);
    expect(result).toEqual(nativeResult);

    // Verify reference behavior matches native implementation
    nested[0].push(6);
    expect(result).toEqual(nativeResult);
  });

  test("handles sparse arrays", () => {
    const sparse1 = [1, , 3];
    const sparse2 = [4, , 6];
    const nativeResult = sparse1.concat(sparse2);
    const result = sparse1.myConcat(sparse2);
    expect(result).toEqual(nativeResult);
  });

  test("handles array-like objects with Symbol.isConcatSpreadable", () => {
    const arrayLike = {
      [Symbol.isConcatSpreadable]: true,
      length: 2,
      0: 1,
      1: 2,
      2: 99,
    };
    // @ts-ignore
    const nativeResult = [0].concat(arrayLike);
    // @ts-ignore
    const result = [0].myConcat(arrayLike);
    expect(result).toEqual(nativeResult);
  });

  test("handles regular objects", () => {
    const obj = { 0: 1, 1: 2, length: 2 };
    // @ts-ignore
    const nativeResult = [0].concat(obj);
    // @ts-ignore
    const result = [0].myConcat(obj);
    expect(result).toEqual(nativeResult);
  });

  test("handles primitive values", () => {
    const arr = [1];
    // @ts-ignore
    const nativeResult = arr.concat(2, "three", true, null, undefined);
    // @ts-ignore
    const result = arr.myConcat(2, "three", true, null, undefined);
    expect(result).toEqual(nativeResult);
  });

  test("handles empty arrays", () => {
    const nativeResult1 = [].concat([], []);
    const result1 = [].myConcat([], []);
    expect(result1).toEqual(nativeResult1);

    const nativeResult2 = [1].concat([], []);
    const result2 = [1].myConcat([], []);
    expect(result2).toEqual(nativeResult2);

    // @ts-ignore
    const nativeResult3 = [].concat([1], [2]);
    // @ts-ignore
    const result3 = [].myConcat([1], [2]);
    expect(result3).toEqual(nativeResult3);
  });

  test("handles array-like objects without Symbol.isConcatSpreadable", () => {
    const arrayLike = {
      length: 2,
      0: "a",
      1: "b",
    };
    // @ts-ignore
    const nativeResult = [1].concat(arrayLike);
    // @ts-ignore
    const result = [1].myConcat(arrayLike);
    expect(result).toEqual(nativeResult);
  });

  test("handles array subclasses", () => {
    class SubArray extends Array {}
    // @ts-ignore
    const subArr = new SubArray(1, 2);
    const nativeResult = [0].concat(subArr);
    // @ts-ignore
    const result = [0].myConcat(subArr);
    expect(result).toEqual(nativeResult);
  });

  test("handles non-array-like objects", () => {
    const obj = { foo: "bar" };
    // @ts-ignore
    const nativeResult = [1].concat(obj);
    // @ts-ignore
    const result = [1].myConcat(obj);
    expect(result).toEqual(nativeResult);
  });

  test("handles null and undefined arguments", () => {
    const arr = [1];
    // @ts-ignore
    const nativeResult = arr.concat(null, undefined);
    // @ts-ignore
    const result = arr.myConcat(null, undefined);
    expect(result).toEqual(nativeResult);
  });

  test("handles array-like objects with non-numeric properties", () => {
    const arrayLike = {
      [Symbol.isConcatSpreadable]: true,
      length: 2,
      0: 1,
      1: 2,
      foo: "bar", // non-numeric property should be ignored
    };
    // @ts-ignore
    const nativeResult = [0].concat(arrayLike);
    // @ts-ignore
    const result = [0].myConcat(arrayLike);
    expect(result).toEqual(nativeResult);
  });

  test("handles array-like objects with length greater than numeric properties", () => {
    const arrayLike = {
      [Symbol.isConcatSpreadable]: true,
      length: 4,
      0: 1,
      1: 2,
    };
    // @ts-ignore
    const nativeResult = [0].concat(arrayLike);
    // @ts-ignore
    const result = [0].myConcat(arrayLike);
    expect(result).toEqual(nativeResult);
  });

  test("handles inherited properties in array-like objects", () => {
    const proto = { 1: "inherited" };
    const arrayLike = Object.create(proto, {
      [Symbol.isConcatSpreadable]: { value: true },
      length: { value: 2 },
      0: { value: "own" },
    });
    const nativeResult = [0].concat(arrayLike);
    const result = [0].myConcat(arrayLike);
    expect(result).toEqual(nativeResult);
  });

  // test("handles changing array during concatenation", () => {
  //   const arr1 = [1, 2];
  //   const arr2 = [3, 4];
  //   Object.defineProperty(arr1, "1", {
  //     get() {
  //       arr2.push(5);
  //       return 2;
  //     },
  //   });
  //   const nativeResult = arr1.concat(arr2);
  //   const result = arr1.myConcat(arr2);
  //   expect(result).toEqual(nativeResult);
  // });
});
