import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    myForEach(
      callbackfn: (value: T, index: number, array: T[]) => void,
      thisArg?: any
    ): void;
  }
}

Array.prototype.myForEach = function (callbackfn, thisArg) {
  if (typeof callbackfn !== "function") {
    throw new TypeError(constructTypeErrorMessage(callbackfn));
  }

  const boundCallback =
    thisArg !== undefined ? callbackfn.bind(thisArg) : callbackfn;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      boundCallback(this[i], i, this);
    }
  }
};

["baba"].myForEach((item, index, arr) => {
  item.toLowerCase();
});
