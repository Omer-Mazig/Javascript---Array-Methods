import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myEvery<S extends T>(
      predicate: (value: T, index: number, array: T[]) => value is S,
      thisArg?: any
    ): this is S[];
    myEvery(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any
    ): boolean;
  }
}

Array.prototype.myEvery = function <T, S extends T>(
  this: T[],
  predicate:
    | ((value: T, index: number, array: T[]) => value is S)
    | ((value: T, index: number, array: T[]) => unknown),
  thisArg?: any
): this is S[] {
  if (typeof predicate !== "function") {
    throw new TypeError(constructTypeErrorMessage(predicate));
  }

  const boundPredicate =
    thisArg !== undefined ? predicate.bind(thisArg) : predicate;

  for (let i = 0; i < this.length; i++) {
    if (i in this && !boundPredicate(this[i], i, this)) {
      return false;
    }
  }

  return true;
};

[1, 2, 3].myEvery((value) => value > 0);
[1, 2, 3].myEvery((value) => typeof value === "number");
[1, 2, 3].every((value) => value > 0);
[1, 2, 3].every((value) => typeof value === "string");
