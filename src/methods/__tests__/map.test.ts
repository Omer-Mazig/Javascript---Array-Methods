import "../map";

describe("Array.prototype.myMap", () => {
  test("maps numbers to their doubles", () => {
    const array = [1, 2, 3];
    const nativeResult = array.map((x) => x * 2);
    const result = array.myMap((x) => x * 2);
    expect(result).toEqual(nativeResult);
  });

  test("creates a new array", () => {
    const array = [1, 2, 3];
    const nativeResult = array.map((x) => x);
    const result = array.myMap((x) => x);
    expect(result).not.toBe(array);
    expect(result).toEqual(nativeResult);
  });

  test("handles empty arrays", () => {
    // @ts-ignore
    const array = [];
    // @ts-ignore
    const nativeResult = array.map((x) => x * 2);
    // @ts-ignore
    const result = array.myMap((x) => x * 2);
    expect(result).toEqual(nativeResult);
  });

  test("callback receives correct arguments", () => {
    const array = ["a", "b", "c"];
    const mockCallback = jest.fn();
    array.myMap(mockCallback);
    expect(mockCallback).toHaveBeenNthCalledWith(1, "a", 0, array);
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b", 1, array);
    expect(mockCallback).toHaveBeenNthCalledWith(3, "c", 2, array);
  });

  test("handles sparse arrays", () => {
    const array = [1, , 3];
    const nativeResult = array.map((x) =>
      x !== undefined ? x * 2 : undefined
    );
    const result = array.myMap((x) => (x !== undefined ? x * 2 : undefined));
    expect(result).toEqual(nativeResult);
    expect(Object.keys(result)).toEqual(Object.keys(nativeResult));
  });

  it("should handle sparse arrays correctly", () => {
    const sparse = [1, , 3, , 5];
    const nativeResult = sparse.map((x) => (x || 0) * 2);
    const result = sparse.myMap((x) => (x || 0) * 2);
    expect(result).toEqual(nativeResult);
    // Compare property descriptors to ensure sparseness is maintained
    expect(Object.getOwnPropertyDescriptor(result, "1")).toBe(
      Object.getOwnPropertyDescriptor(nativeResult, "1")
    );
    expect(Object.getOwnPropertyDescriptor(result, "3")).toBe(
      Object.getOwnPropertyDescriptor(nativeResult, "3")
    );
  });

  it("should handle array-like objects", () => {
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
    };
    const nativeResult = Array.prototype.map.call(arrayLike, (x) => x * 2);
    const result = Array.prototype.myMap.call(arrayLike, (x) => x * 2);
    expect(result).toEqual(nativeResult);
  });

  it("should throw for undefined/null callback", () => {
    const arr = [1, 2, 3];
    // @ts-ignore
    expect(() => arr.myMap(undefined)).toThrow(TypeError);
    // @ts-ignore
    expect(() => arr.myMap(null)).toThrow(TypeError);
  });

  it("should handle modifications during iteration", () => {
    const arr = [1, 2, 3, 4];
    const nativeArr = [1, 2, 3, 4];
    const nativeResult = nativeArr.map((x, i, array) => {
      if (i === 0) array[1] = 10;
      return x * 2;
    });
    const result = arr.myMap((x, i, array) => {
      if (i === 0) array[1] = 10;
      return x * 2;
    });
    expect(result).toEqual(nativeResult);
  });

  it("should process all elements unless an error is thrown", () => {
    const arr = [1, 2, 3, 4, 5];
    // @ts-ignore
    const processed = [];

    try {
      arr.myMap((x, i) => {
        processed.push(x);
        if (i === 2) throw new Error("Test error");
        return x * 2;
      });
    } catch (e) {}

    // @ts-ignore
    expect(processed).toEqual([1, 2, 3]); // Should process until error
  });
});
