import { convertToNumber, handleNegativeIndex } from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
     * @param start The beginning index of the specified portion of the array.
     * @param end The end index of the specified portion of the array.
     */
    mySlice(start?: number, end?: number): T[];
  }
}

Array.prototype.mySlice = function <T>(
  this: T[],
  start?: number,
  end?: number
): T[] {
  const len = this.length;
  const result: T[] = [];

  // Handle default values here instead of in convertToNumber
  let actualStart = start === undefined ? 0 : convertToNumber(start);
  let actualEnd = end === undefined ? len : convertToNumber(end);

  // Handle negative indices using helper function
  actualStart = handleNegativeIndex(actualStart, len);
  actualEnd = handleNegativeIndex(actualEnd, len);

  // If start is greater than end, return empty array
  if (actualStart >= actualEnd) {
    return result;
  }

  // Copy elements to result array, preserving holes in sparse arrays
  let j = 0;
  for (let i = actualStart; i < actualEnd; i++) {
    if (i in this) {
      result[j] = this[i];
    }
    j++;
  }

  return result;
};
