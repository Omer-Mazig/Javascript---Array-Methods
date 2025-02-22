import "../for-each";

describe("Array.prototype.myForEach", () => {
  test("iterates over all elements", () => {
    const array = [1, 2, 3];
    // @ts-ignore
    const results = [];
    // @ts-ignore
    const nativeResults = [];

    array.myForEach((num) => results.push(num));
    array.forEach((num) => nativeResults.push(num));

    // @ts-ignore
    expect(results).toEqual(nativeResults);
  });

  test("provides correct index to callback", () => {
    const array = ["a", "b", "c"];
    // @ts-ignore
    const indices = [];
    // @ts-ignore
    const nativeIndices = [];

    array.myForEach((_, index) => indices.push(index));
    array.forEach((_, index) => nativeIndices.push(index));

    // @ts-ignore
    expect(indices).toEqual(nativeIndices);
  });

  test("provides array reference to callback", () => {
    const array = [1, 2, 3];
    let myArrayRef;
    let nativeArrayRef;

    array.myForEach((_, __, arr) => {
      myArrayRef = arr;
    });
    array.forEach((_, __, arr) => {
      nativeArrayRef = arr;
    });

    expect(myArrayRef).toBe(array);
    expect(myArrayRef).toBe(nativeArrayRef);
  });

  test("handles empty arrays", () => {
    // @ts-ignore
    const array = [];
    let myCallCount = 0;
    let nativeCallCount = 0;

    // @ts-ignore
    array.myForEach(() => myCallCount++);
    // @ts-ignore
    array.forEach(() => nativeCallCount++);

    expect(myCallCount).toBe(nativeCallCount);
  });

  test("handles sparse arrays", () => {
    // @ts-ignore
    const array = [1, , 3];
    // @ts-ignore
    const results = [];
    // @ts-ignore
    const nativeResults = [];

    array.myForEach((x) => results.push(x));
    array.forEach((x) => nativeResults.push(x));

    // @ts-ignore
    expect(results).toEqual(nativeResults);
  });

  test("throws TypeError when callback is not a function", () => {
    const array = [1, 2, 3];
    expect(() => {
      // @ts-ignore - Testing JavaScript runtime behavior
      array.myForEach(null);
    }).toThrow(TypeError);
  });

  test("callback receives correct arguments", () => {
    const array = ["a", "b", "c"];
    const mockCallback = jest.fn();
    array.myForEach(mockCallback);

    expect(mockCallback).toHaveBeenNthCalledWith(1, "a", 0, array);
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b", 1, array);
    expect(mockCallback).toHaveBeenNthCalledWith(3, "c", 2, array);
  });

  test("does not mutate the array", () => {
    const array = [1, 2, 3];
    const original = [...array];

    array.myForEach((x) => x * 2);

    expect(array).toEqual(original);
  });

  test("handles array modifications during iteration", () => {
    const array = [1, 2, 3];
    // @ts-ignore
    const results = [];
    // @ts-ignore
    const nativeResults = [];

    array.myForEach((num) => {
      results.push(num);
      if (num === 2) array.push(4);
    });

    array.forEach((num) => {
      nativeResults.push(num);
      if (num === 2) array.push(5);
    });

    // @ts-ignore
    expect(results).toEqual(nativeResults);
  });

  it("should handle sparse arrays correctly", () => {
    // @ts-ignore
    const sparse = [1, , 3, , 5];
    // @ts-ignore
    const myResult = [];
    // @ts-ignore
    const nativeResult = [];

    sparse.myForEach((x) => {
      if (x !== undefined) myResult.push(x);
    });

    sparse.forEach((x) => {
      if (x !== undefined) nativeResult.push(x);
    });

    // @ts-ignore
    expect(myResult).toEqual(nativeResult);
  });

  it("should handle array-like objects", () => {
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
    };
    // @ts-ignore
    const result = [];
    Array.prototype.myForEach.call(arrayLike, (x) => result.push(x * 2));
    // @ts-ignore
    expect(result).toEqual([2, 4, 6]);
  });

  it("should handle modifications during iteration", () => {
    const arr = [1, 2, 3, 4];
    // @ts-ignore
    const nativeArr = [1, 2, 3, 4];
    // @ts-ignore
    const myResult = [];
    // @ts-ignore
    const nativeResult = [];

    arr.myForEach((x, i, array) => {
      myResult.push(x);
      if (i === 1) array[2] = 10;
    });

    nativeArr.forEach((x, i, array) => {
      nativeResult.push(x);
      if (i === 1) array[2] = 10;
    });

    // @ts-ignore
    expect(myResult).toEqual(nativeResult);
  });

  it("should handle deletion during iteration", () => {
    const arr = [1, 2, 3, 4];
    const nativeArr = [1, 2, 3, 4];
    // @ts-ignore
    const myResult = [];
    // @ts-ignore
    const nativeResult = [];

    arr.myForEach((x, i, array) => {
      myResult.push(x);
      delete array[i + 1];
    });

    nativeArr.forEach((x, i, array) => {
      nativeResult.push(x);
      delete array[i + 1];
    });

    // @ts-ignore
    expect(myResult).toEqual(nativeResult);
  });

  it("should process all elements unless an error is thrown", () => {
    const arr = [1, 2, 3, 4, 5];
    // @ts-ignore
    const processed = [];

    try {
      arr.myForEach((x, i) => {
        processed.push(x);
        if (i === 2) throw new Error("Test error");
      });
    } catch (e) {}

    // @ts-ignore
    expect(processed).toEqual([1, 2, 3]); // Should process until error
  });
});
