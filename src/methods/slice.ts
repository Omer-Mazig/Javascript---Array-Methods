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

  // Convert parameters to numbers
  let actualStart = 0;
  let actualEnd = len;

  actualStart = parseArgument(start) ?? 0; // 0 is default
  actualEnd = parseArgument(end) ?? len;

  actualStart = normalizeArrayIndex(actualStart, len);
  actualEnd = normalizeArrayIndex(actualEnd, len);

  // If start is greater than end, return empty array
  if (actualStart >= actualEnd) {
    return result;
  }

  actualStart = roundNumber(actualStart);
  actualEnd = roundNumber(actualEnd);

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

function parseArgument(value: unknown): number | undefined {
  if (value === undefined) return undefined;

  if (typeof value === "string" && !isNaN(+value)) {
    return +value;
  }

  if (Array.isArray(value) && value.length === 1) {
    const item = value[0];
    if (
      (typeof item === "number" && !isNaN(item)) ||
      (typeof item === "string" && !isNaN(+item))
    ) {
      return +item;
    }
  }

  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }

  return undefined;
}

function normalizeArrayIndex(index: number, length: number): number {
  if (index < 0) {
    return Math.max(length + index, 0);
  }
  return Math.min(index, length);
}

function roundNumber(n: number) {
  n > 0 ? (n = Math.floor(n)) : Math.ceil(n);
  return n;
}
