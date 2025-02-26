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
// @ts-ignore
Array.prototype.myEvery = function (predicate, thisArg) {
  if (typeof predicate !== "function" && this.length === 0) {
    predicate();
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

// TODO: this is S[] ?
[1, 2, 3].every((value) => value > 0);
const a = [1, 2, 3].every((value) => typeof value === "string");
[1, 2, 3].myEvery((value) => value > 0);
[1, 2, 3].myEvery((value) => typeof value === "number");
