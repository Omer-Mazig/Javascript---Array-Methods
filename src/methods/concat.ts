import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myConcat(...items: Array<T>[]): T[];
    myConcat(...items: (T | Array<T>)[]): T[];
  }
}

// @ts-ignore
Array.prototype.myConcat = function (...items) {
  const result = [];

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
      for (let j = 0; j < item.length; j++) {
        result.push(item[j]);
      }
    } else {
      result.push(item);
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
