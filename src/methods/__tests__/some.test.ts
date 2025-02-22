import "../some";

describe("Array.prototype.mySome", () => {
  test("returns true if any element passes test", () => {
    const array = [1, 2, 3, 4];
    const nativeResult = array.some((num) => num > 3);
    const result = array.mySome((num) => num > 3);
    expect(result).toBe(nativeResult);
  });

  test("returns false if no elements pass test", () => {
    const array = [1, 2, 3, 4];
    const nativeResult = array.some((num) => num > 4);
    const result = array.mySome((num) => num > 4);
    expect(result).toBe(nativeResult);
  });

  test("returns false for empty array", () => {
    // @ts-ignore
    const array = [];
    // @ts-ignore
    const nativeResult = array.some((num) => num > 0);
    // @ts-ignore
    const result = array.mySome((num) => num > 0);
    expect(result).toBe(nativeResult);
  });

  test("stops iteration after finding true", () => {
    const array = [1, 2, 3, 4, 5];
    let iterationCount = 0;
    array.mySome((num) => {
      iterationCount++;
      return num === 3;
    });
    expect(iterationCount).toBe(3);
  });

  test("handles undefined values", () => {
    const array = [1, undefined, 3];
    const nativeResult = array.some((x) => x === undefined);
    const result = array.mySome((x) => x === undefined);
    expect(result).toBe(nativeResult);
  });

  test("handles sparse arrays", () => {
    const array = [1, , 3];
    const nativeResult = array.some((x) => x === undefined);
    const result = array.mySome((x) => x === undefined);
    expect(result).toBe(nativeResult);
  });

  it("should return false for empty arrays", () => {
    expect([].mySome((x) => x > 0)).toBe(false);
  });

  it("should handle sparse arrays correctly", () => {
    const sparse = [, , ,];
    const nativeResult1 = sparse.some((x) => x === undefined);
    const result1 = sparse.mySome((x) => x === undefined);
    expect(result1).toBe(nativeResult1);

    const nativeResult2 = sparse.some((x) => x !== undefined);
    const result2 = sparse.mySome((x) => x !== undefined);
    expect(result2).toBe(nativeResult2);
  });

  it("should stop iteration on first true result", () => {
    let myCount = 0;
    let nativeCount = 0;
    const arr = [1, 2, 3, 4, 5];

    arr.mySome((x) => {
      myCount++;
      return x > 3;
    });

    arr.some((x) => {
      nativeCount++;
      return x > 3;
    });

    expect(myCount).toBe(nativeCount);
  });

  it("should handle modifications during iteration", () => {
    const arr = [1, 2, 3, 4];
    const nativeArr = [1, 2, 3, 4];

    const nativeResult = nativeArr.some((x, i, array) => {
      if (i === 0) array[1] = 10;
      return x > 5;
    });

    const result = arr.mySome((x, i, array) => {
      if (i === 0) array[1] = 10;
      return x > 5;
    });

    expect(result).toBe(nativeResult);
  });
});
