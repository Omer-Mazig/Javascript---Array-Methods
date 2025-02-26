import {} from "../arrays";

declare global {
  interface Array<T> {
    myForEach(
      callbackfn: (value: T, index: number, array: T[]) => void,
      thisArg?: any
    ): void;
  }
}

Array.prototype.myForEach = function (callbackfn, thisArg) {
  if (typeof callbackfn !== "function" && this.length === 0) {
    //@ts-expect-error
    callbackfn();
  }

  const boundCallback =
    thisArg !== undefined ? callbackfn.bind(thisArg) : callbackfn;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      boundCallback(this[i], i, this);
    }
  }
};

["baba", 1].myForEach((item, index, arr) => {
  typeof item === "string" ? item.toLowerCase() : item.toFixed();
});
