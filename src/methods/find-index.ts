import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myFindIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number;
  }
}

Array.prototype.myFindIndex = function (predicate, thisArg): number {
  if (typeof predicate !== "function" && this.length === 0) {
    // @ts-expect-error
    predicate();
  }

  const boundPredicate =
    thisArg !== undefined ? predicate.bind(thisArg) : predicate;

  for (let i = 0; i < this.length; i++) {
    if (boundPredicate(this[i], i, this)) {
      return i;
    }
  }

  return -1;
};
