import { handleNegativeIndex } from "../arrays";

declare global {
  interface Array<T> {
    myIndexOf(searchElement: T, fromIndex?: number): number;
  }
}

Array.prototype.myIndexOf = function <T>(
  this: T[],
  searchElement: T,
  fromIndex: number = 0
): number {
  const len = this.length;
  const startingIndex = handleNegativeIndex(fromIndex, len);
  for (let i = startingIndex; i < len; i++) {
    if (i in this) {
      if (searchElement === this[i]) {
        return i;
      }
    }
  }
  return -1;
};
