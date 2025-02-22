import { convertToNumber, handleNegativeIndex } from "../arrays";

declare global {
  interface Array<T> {
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

  // Convert parameters to numbers using the helper function
  let actualStart = convertToNumber(start, 0);
  let actualEnd = convertToNumber(end, len);

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
