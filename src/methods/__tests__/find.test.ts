import "../find";

describe("Array.prototype.myFind", () => {
  test("finds first even number", () => {
    const array = [1, 2, 3, 4];
    const nativeResult = array.find((x) => x % 2 === 0);
    const result = array.myFind((x) => x % 2 === 0);
    expect(result).toBe(nativeResult);
  });

  test("returns undefined when no element found", () => {
    const array = [1, 3, 5];
    const nativeResult = array.find((x) => x % 2 === 0);
    const result = array.myFind((x) => x % 2 === 0);
    expect(result).toBe(nativeResult);
  });

  test("callback receives correct arguments", () => {
    const array = ["a", "b", "c"];
    const mockCallback = jest.fn();
    array.myFind(mockCallback);
    expect(mockCallback).toHaveBeenNthCalledWith(1, "a", 0, array);
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b", 1, array);
    expect(mockCallback).toHaveBeenNthCalledWith(3, "c", 2, array);
  });

  test("stops iteration after finding element", () => {
    const array = [1, 2, 3, 4];
    let iterationCount = 0;
    array.myFind((x) => {
      iterationCount++;
      return x === 2;
    });
    expect(iterationCount).toBe(2);
  });

  test("handles sparse arrays", () => {
    const array = [1, , 3];
    const nativeResult = array.find((x) => x === undefined);
    const result = array.myFind((x) => x === undefined);
    expect(result).toBe(nativeResult);
  });

  test("handles modifications during iteration", () => {
    const array = [1, 2, 3, 4];
    const result = array.myFind((x, i, arr) => {
      if (i === 0) arr[1] = 10;
      return x > 5;
    });
    const nativeResult = array.find((x, i, arr) => {
      if (i === 0) arr[1] = 10;
      return x > 5;
    });
    expect(result).toBe(nativeResult);
  });

  test("throws for undefined/null callback", () => {
    const arr = [1, 2, 3];
    // @ts-ignore
    expect(() => arr.myFind(undefined)).toThrow(TypeError);
    // @ts-ignore
    expect(() => arr.myFind(null)).toThrow(TypeError);
  });
});
