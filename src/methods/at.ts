import { handleNegativeIndex, convertToNumber } from "../arrays";

declare global {
  interface Array<T> {
    myAt(index: number): T | undefined;
  }
}

Array.prototype.myAt = function <T>(this: T[], index: number): T | undefined {
  const len = this.length;

  const convertedIndex = convertToNumber(index);
  const actualIndex = handleNegativeIndex(convertedIndex, len);

  return this[actualIndex];
};

[].myAt(1);
