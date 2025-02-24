import {} from "../arrays";

declare global {
  interface Array<T> {
    myMap<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: any
    ): U[];
  }
}

Array.prototype.myMap = function (callbackfn, thisArg) {
  if (typeof callbackfn !== "function" && this.length === 0) {
    // @ts-expect-error
    callbackfn();
  }

  const boundCallback =
    thisArg !== undefined ? callbackfn.bind(thisArg) : callbackfn;

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = boundCallback(this[i], i, this);
    }
  }

  return result;
};

const numbers1 = [1, 2, 3].map((item) => item * 2);
const string1 = [1, 2, 3].map((item) => String(item));
const bools1 = [1, 2, 3].map(() => true);

const numbers2 = [1, 2, 3].myMap((item) => item * 2);
const string2 = [1, 2, 3].myMap((item) => String(item));
const bools2 = [1, 2, 3].myMap(() => true);
