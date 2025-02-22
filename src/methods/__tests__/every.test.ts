import "../every";

describe("Array.prototype.myEvery", () => {
  test("returns true when all elements pass the test", () => {
    const array = [2, 4, 6, 8];
    const nativeResult = array.every((num) => num % 2 === 0);
    const result = array.myEvery((num) => num % 2 === 0);
    expect(result).toBe(nativeResult);
  });

  test("returns false when any element fails the test", () => {
    const array = [2, 4, 5, 8];
    const nativeResult = array.every((num) => num % 2 === 0);
    const result = array.myEvery((num) => num % 2 === 0);
    expect(result).toBe(nativeResult);
  });

  test("returns true for empty array", () => {
    // @ts-ignore
    const array = [];

    // @ts-ignore
    const nativeResult = array.every((num) => num > 0);
    // @ts-ignore
    const result = array.myEvery((num) => num > 0);
    expect(result).toBe(nativeResult);
  });

  test("throws TypeError when callback is not a function", () => {
    const array = [1, 2, 3];
    expect(() => {
      // @ts-ignore - Testing JavaScript runtime behavior
      array.myEvery(null);
    }).toThrow(TypeError);
  });

  test("works with array of strings", () => {
    const array = ["apple", "banana", "cherry"];
    const result = array.myEvery((str) => str.length > 3);
    expect(result).toBe(true);
  });

  test("stops iteration after first false result", () => {
    const array = [1, 2, 3, 4, 5];
    let iterationCount = 0;

    array.myEvery((num) => {
      iterationCount++;
      return num < 3;
    });

    expect(iterationCount).toBe(3);
  });

  test("handles sparse arrays", () => {
    const array = [1, , 3];
    const nativeResult = array.every((x) => x !== undefined);
    const result = array.myEvery((x) => x !== undefined);
    expect(result).toBe(nativeResult);
  });

  it("should return true for empty arrays", () => {
    expect([].myEvery((x) => x > 0)).toBe(true);
  });

  it("should handle sparse arrays correctly", () => {
    const sparse = [1, , 3, , 5];
    const nativeResult1 = sparse.every((x) => x !== undefined);
    const result1 = sparse.myEvery((x) => x !== undefined);
    expect(result1).toBe(nativeResult1);

    const nativeResult2 = sparse.every((x) => x === undefined || x > 0);
    const result2 = sparse.myEvery((x) => x === undefined || x > 0);
    expect(result2).toBe(nativeResult2);
  });

  it("should stop iteration on first false result", () => {
    let myCount = 0;
    let nativeCount = 0;
    const arr = [1, 2, 3, 4, 5];

    arr.myEvery((x) => {
      myCount++;
      return x < 3;
    });

    arr.every((x) => {
      nativeCount++;
      return x < 3;
    });

    expect(myCount).toBe(nativeCount);
  });

  it("should handle modifications during iteration", () => {
    const arr = [2, 4, 6, 8];
    const nativeArr = [2, 4, 6, 8];

    const nativeResult = nativeArr.every((x, i, array) => {
      if (i === 0) array[1] = 3;
      return x % 2 === 0;
    });

    const result = arr.every((x, i, array) => {
      if (i === 0) array[1] = 3;
      return x % 2 === 0;
    });

    expect(result).toBe(nativeResult);
  });
});
