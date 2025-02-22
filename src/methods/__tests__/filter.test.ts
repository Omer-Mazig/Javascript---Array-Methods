import "../filter";

describe("Array.prototype.myFilter", () => {
  test("filters even numbers", () => {
    const array = [1, 2, 3, 4, 5, 6];
    const nativeResult = array.filter((num) => num % 2 === 0);
    const result = array.myFilter((num) => num % 2 === 0);
    expect(result).toEqual(nativeResult);
  });

  test("creates a new array", () => {
    const array = [1, 2, 3];
    const nativeResult = array.filter(() => true);
    const result = array.myFilter(() => true);
    expect(result).not.toBe(array);
    expect(result).toEqual(nativeResult);
  });

  test("handles empty arrays", () => {
    // @ts-ignore
    const array = [];
    // @ts-ignore
    const nativeResult = array.filter((x) => x > 0);
    // @ts-ignore
    const result = array.myFilter((x) => x > 0);
    expect(result).toEqual(nativeResult);
  });

  test("callback receives correct arguments", () => {
    const array = ["a", "b", "c"];
    const mockCallback = jest.fn(() => true);
    array.myFilter(mockCallback);
    expect(mockCallback).toHaveBeenNthCalledWith(1, "a", 0, array);
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b", 1, array);
    expect(mockCallback).toHaveBeenNthCalledWith(3, "c", 2, array);
  });

  test("handles sparse arrays", () => {
    const array = [1, , 3]; // eslint-disable-line no-sparse-arrays
    const nativeResult = array.filter((x) => x !== undefined);
    const result = array.myFilter((x) => x !== undefined);
    expect(result).toEqual(nativeResult);
  });

  test("handle type narrowing with typeof", () => {
    const array = [1, "2", 3];
    const nativeResult = array.filter((x) => typeof x == "number");
    const result = array.myFilter((x) => typeof x == "number");
    expect(result).toEqual(nativeResult);
  });

  test("handle type narrowing with instancesof ", () => {
    class X {
      x() {}
    }
    class Y {
      y() {}
    }
    const array = [new X(), new Y()];
    const nativeResult = array.filter((x) => x instanceof X);
    const result = array.myFilter((x) => x instanceof X);
    expect(result).toEqual(nativeResult);
  });

  test("handle type narrowing with the 'in' operator ", () => {
    class X {
      x() {}
    }
    class Y {
      y() {}
    }
    const array = [new X(), new Y()];
    const nativeResult = array.filter((x) => "x" in x);
    const result = array.myFilter((x) => "x" in x);
    expect(result).toEqual(nativeResult);
  });

  it("should handle sparse arrays correctly", () => {
    const sparse = [1, , 3, , 5];
    const nativeResult = sparse.filter((x) => x !== undefined);
    const result = sparse.myFilter((x) => x !== undefined);
    expect(result).toEqual(nativeResult);
  });

  it("should handle array-like objects", () => {
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
    };
    const nativeResult = Array.prototype.filter.call(
      arrayLike,
      (x) => x % 2 === 1
    );
    const result = Array.prototype.myFilter.call(arrayLike, (x) => x % 2 === 1);
    expect(result).toEqual(nativeResult);
  });

  it("should handle modifications during iteration", () => {
    const arr = [1, 2, 3, 4];
    const nativeArr = [1, 2, 3, 4];
    const nativeResult = nativeArr.filter((x, i, array) => {
      if (i === 0) array[1] = 10;
      return x > 2;
    });
    const result = arr.myFilter((x, i, array) => {
      if (i === 0) array[1] = 10;
      return x > 2;
    });
    expect(result).toEqual(nativeResult);
  });

  it("should process all elements unless an error is thrown", () => {
    const arr = [1, 2, 3, 4, 5];
    // @ts-ignore
    const processed = [];

    try {
      arr.myFilter((x, i) => {
        processed.push(x);
        if (i === 2) throw new Error("Test error");
        return x % 2 === 0;
      });
    } catch (e) {}

    // @ts-ignore
    expect(processed).toEqual([1, 2, 3]); // Should process until error
  });
});
