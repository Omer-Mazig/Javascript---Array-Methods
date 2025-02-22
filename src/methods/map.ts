import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    myMap<U>(callback: (value: T, index: number, array: T[]) => U): U[];
  }
}

Array.prototype.myMap = function <T, U>(
  this: T[],
  callback: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[] {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  const boundCallback =
    thisArg !== undefined ? callback.bind(thisArg) : callback;

  const result: U[] = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      const newValue = boundCallback(this[i], i, this);
      result[i] = newValue;
    }
  }

  return result;
};

const a = [1, "baba"].map((item) => String(item));
const b = [1].myMap((item) => String(item));
