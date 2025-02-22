import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myFilter<S extends T>(
      callback: (value: T, index: number, array: T[]) => value is S
    ): S[];
    myFilter(callback: (value: T, index: number, array: T[]) => unknown): T[];
  }
}

Array.prototype.myFilter = function <T, S extends T>(
  this: T[],
  predicate:
    | ((value: T, index: number, array: T[]) => value is S)
    | ((value: T, index: number, array: T[]) => unknown),
  thisArg?: any
): T[] | S[] {
  if (typeof predicate !== "function") {
    throw new TypeError(constructTypeErrorMessage(predicate));
  }

  const boundPredicate =
    thisArg !== undefined ? predicate.bind(thisArg) : predicate;

  const result: T[] = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && boundPredicate(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

[1, 2, "3"].filter((value) => (value ? value : undefined));
[1, 2, "3"].myFilter((value) => (value ? value : undefined));
[1, 2, "3"].filter((value) => typeof value === "number");
[1, 2, "3"].myFilter((value) => typeof value === "number");
