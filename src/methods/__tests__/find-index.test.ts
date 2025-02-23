import "../find-index";

describe("myFindIndex", () => {
  it("should find index of first element that satisfies the condition", () => {
    const numbers = [5, 12, 8, 130, 44];
    const isLargeNumber = (element: number) => element > 13;

    expect(numbers.myFindIndex(isLargeNumber)).toBe(
      numbers.findIndex(isLargeNumber)
    );
  });

  it("should return -1 when no element satisfies the condition", () => {
    const numbers = [5, 12, 8, 130, 44];
    const isNegative = (element: number) => element < 0;

    expect(numbers.myFindIndex(isNegative)).toBe(numbers.findIndex(isNegative));
  });

  it("should work with object arrays", () => {
    const inventory = [
      { name: "apples", quantity: 2 },
      { name: "bananas", quantity: 0 },
      { name: "cherries", quantity: 5 },
    ];

    const findBananas = (fruit: { name: string }) => fruit.name === "bananas";

    expect(inventory.myFindIndex(findBananas)).toBe(
      inventory.findIndex(findBananas)
    );
  });

  it("should pass element index to callback", () => {
    const fruits = ["apple", "banana", "cantaloupe"];
    const findIndexOne = (_element: string, index: number) => index === 1;

    expect(fruits.myFindIndex(findIndexOne)).toBe(
      fruits.findIndex(findIndexOne)
    );
  });

  it("should pass array to callback", () => {
    const numbers = [1, 2, 3, 4];
    const findUsingArray = (element: number, _index: number, arr: number[]) =>
      element === arr[arr.length - 1];

    expect(numbers.myFindIndex(findUsingArray)).toBe(
      numbers.findIndex(findUsingArray)
    );
  });

  it("should work with empty arrays", () => {
    const emptyArray: number[] = [];
    const findAny = (x: number) => x > 0;

    expect(emptyArray.myFindIndex(findAny)).toBe(emptyArray.findIndex(findAny));
  });

  it("should use the provided this context", () => {
    const numbers = [1, 2, 3];
    const context = { threshold: 2 };
    const findAboveThreshold = function (this: typeof context, value: number) {
      return value > this.threshold;
    };

    expect(numbers.myFindIndex(findAboveThreshold, context)).toBe(
      numbers.findIndex(findAboveThreshold, context)
    );
  });

  it("should not modify the original array", () => {
    const original = [1, 2, 3, 4];
    const copy = [...original];

    original.myFindIndex((x) => x > 2);
    expect(original).toEqual(copy);
  });

  it("should handle sparse arrays correctly", () => {
    // eslint-disable-next-line no-sparse-arrays
    const sparseArray = [1, , 3, , 5];
    const findUndefined = (x: number) => x === undefined;

    // @ts-ignore
    expect(sparseArray.myFindIndex(findUndefined)).toBe(
      // @ts-ignore
      sparseArray.findIndex(findUndefined)
    );

    const findNumber = (x: number) => x === 3;
    // @ts-ignore
    expect(sparseArray.myFindIndex(findNumber)).toBe(
      // @ts-ignore
      sparseArray.findIndex(findNumber)
    );
  });

  it("should work on array-like objects", () => {
    const arrayLike = {
      length: 3,
      0: 2,
      1: 7,
      2: 9,
    };

    const findSeven = (x: number) => x === 7;
    expect(Array.prototype.myFindIndex.call(arrayLike, findSeven)).toBe(
      Array.prototype.findIndex.call(arrayLike, findSeven)
    );
  });

  it("should correctly pass all three arguments to callback", () => {
    const array = ["a", "b", "c"];
    const calls: [string, number, string[]][] = [];

    array.myFindIndex((element, index, arr) => {
      calls.push([element, index, arr]);
      return false;
    });

    const expectedCalls: [string, number, string[]][] = [];
    array.findIndex((element, index, arr) => {
      expectedCalls.push([element, index, arr]);
      return false;
    });

    expect(calls).toEqual(expectedCalls);
  });

  it("should handle callback that modifies the array", () => {
    const array = [1, 2, 3, 4];
    let callCount = 0;

    const result = array.myFindIndex((element, index, arr) => {
      callCount++;
      arr[index + 1] = 10; // modify next element
      return element > 2;
    });

    let expectedCallCount = 0;
    const expectedResult = array.findIndex((element, index, arr) => {
      expectedCallCount++;
      arr[index + 1] = 10;
      return element > 2;
    });

    expect(result).toBe(expectedResult);
    expect(callCount).toBe(expectedCallCount);
  });

  it("should throw TypeError if callbackFn is not a function", () => {
    const array = [1, 2, 3];

    // @ts-expect-error: Testing invalid callback
    expect(() => array.myFindIndex(undefined)).toThrow(TypeError);
    // @ts-expect-error: Testing invalid callback
    expect(() => array.myFindIndex(null)).toThrow(TypeError);
    // @ts-expect-error: Testing invalid callback
    expect(() => array.myFindIndex({})).toThrow(TypeError);
  });
});
