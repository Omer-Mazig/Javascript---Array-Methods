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
