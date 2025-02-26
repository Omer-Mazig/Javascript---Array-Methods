import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    mySome<S extends T>(
      predicate: (value: T, index: number, array: T[]) => value is S,
      thisArg?: any
    ): this is S[];
    mySome(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any
    ): boolean;
  }
}

// @ts-ignore
Array.prototype.mySome = function (predicate, thisArg) {
  if (typeof predicate !== "function") {
    throw new TypeError(constructTypeErrorMessage(predicate));
  }

  const boundPredicate =
    thisArg !== undefined ? predicate.bind(thisArg) : predicate;

  for (let i = 0; i < this.length; i++) {
    if (i in this && boundPredicate(this[i], i, this)) {
      return true;
    }
  }

  return false;
};

[1, 2, 3].mySome((value) => value > 0);
[1, 2, 3].mySome((value) => typeof value === "number");
[1, 2, 3].some((value) => value > 0);
[1, 2, 3].some((value) => typeof value !== "string");
