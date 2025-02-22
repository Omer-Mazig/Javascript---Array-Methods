import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
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
