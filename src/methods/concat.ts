import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Combines two or more arrays.
     * @param items The arrays to concatenate.
     */
    myConcat(...items: Array<T>[]): T[];
    myConcat(...items: (T | Array<T>)[]): T[];
  }
}

Array.prototype.myConcat = function <T>(
  this: Array<T>,
  ...items: Array<T>[] | (T | Array<T>)[]
): // return the type of 'this'
T[] {
  const result: T[] = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = this[i];
    }
  }

  if (items.length === 0) {
    return result;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (isConcatSpreadable(item)) {
      const arr = item as T[];
      for (let j = 0; j < arr.length; j++) {
        result.push(arr[j]);
      }
    } else {
      result.push(item as T);
    }
  }

  return result;
};

// Symbol.isConcatSpreadable
// It is a property that is used to determine if an object should be flattened when using the concat method.
function isConcatSpreadable(item: unknown): boolean {
  return (
    Array.isArray(item) ||
    (typeof item === "object" &&
      item !== null &&
      (item as { [Symbol.isConcatSpreadable]?: boolean })[
        Symbol.isConcatSpreadable
      ] === true)
  );
}
