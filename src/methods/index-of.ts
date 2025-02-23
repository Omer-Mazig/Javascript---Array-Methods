import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to start the search. Defaults to 0.
     */
    myIndexOf(searchElement: T, fromIndex?: number): number;
  }
}

Array.prototype.myIndexOf = function <T>(
  this: T[],
  searchElement: T,
  fromIndex: number = 0
): number {
  const len = this.length;

  // Handle negative fromIndex
  let startingIndex = normalizeIndex(fromIndex, len);

  for (let i = startingIndex; i < len; i++) {
    if (i in this) {
      if (searchElement === this[i]) {
        return i;
      }
    }
  }
  return -1;
};

function normalizeIndex(index: number, length: number): number {
  if (index < 0) {
    return Math.max(length + index, 0);
  }
  return Math.min(index, length);
}
