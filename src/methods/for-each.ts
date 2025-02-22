import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
      Performs the specified action for each element in an array.
      @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    myForEach(
      callback: (value: T, index: number, array: T[]) => void,
      thisArg?: any
    ): void;
  }
}

Array.prototype.myForEach = function <T>(
  this: T[],
  callback: (value: T, index: number, array: T[]) => void,
  thisArg?: any
): void {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  const boundCallback =
    thisArg !== undefined ? callback.bind(thisArg) : callback;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      boundCallback(this[i], i, this);
    }
  }
};

[].forEach;
[].myForEach;
