import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    myFindIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number;
  }
}

Array.prototype.myFindIndex = function (predicate, thisArg): number {
  if (typeof predicate !== "function" && this.length === 0) {
    // @ts-ignore
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
