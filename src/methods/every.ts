import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls the predicate function for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
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
