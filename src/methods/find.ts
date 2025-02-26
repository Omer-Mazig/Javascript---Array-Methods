import {} from "../arrays";

declare global {
  interface Array<T> {
    myFind<S extends T>(
      callback: (value: T, index: number, array: T[]) => value is S,
      thisArg?: any
    ): S | undefined;
    myFind(
      callback: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any
    ): T | undefined;
  }
}

Array.prototype.myFind = function (predicate, thisArg) {
  if (typeof predicate !== "function" && this.length === 0) {
    predicate();
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
