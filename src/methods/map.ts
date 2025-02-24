import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    myMap<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: any
    ): U[];
  }
}

Array.prototype.myMap = function (callbackfn, thisArg) {
  if (typeof callbackfn !== "function") {
    throw new TypeError(constructTypeErrorMessage(callbackfn));
  }

  const boundCallback =
    thisArg !== undefined ? callbackfn.bind(thisArg) : callbackfn;

  const result = [];
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
