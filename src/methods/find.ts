import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Returns the value of the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
     * @param callbackfn A function that accepts up to three arguments. The find method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    myFind<S extends T>(
      callback: (value: T, index: number, array: T[]) => value is S
    ): S | undefined;
    myFind(
      callback: (value: T, index: number, array: T[]) => unknown
    ): T | undefined;
  }
}

Array.prototype.myFind = function <T, S extends T>(
  this: T[],
  predicate:
    | ((value: T, index: number, array: T[]) => value is S)
    | ((value: T, index: number, array: T[]) => unknown),
  thisArg?: any
): T | S | undefined {
  if (typeof predicate !== "function") {
    throw new TypeError(constructTypeErrorMessage(predicate));
  }

  const boundPredicate =
    thisArg !== undefined ? predicate.bind(thisArg) : predicate;

  for (let i = 0; i < this.length; i++) {
    if (i in this && boundPredicate(this[i], i, this)) {
      return this[i];
    }
  }

  return undefined;
};

[1, 2, "3"].myFind((item) => item);
[1, 2, "3"].myFind((item) => typeof item === "number");
