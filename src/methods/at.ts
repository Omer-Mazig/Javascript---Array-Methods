import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myAt(index: number): T | undefined;
  }
}

Array.prototype.myAt = function <T>(this: T[], index: number): T | undefined {
  // Get the length once
  const len = this.length;

  // Handle undefined, null, or no argument - should return first element
  if (arguments.length === 0 || index === undefined || index === null) {
    return this[0];
  }

  // Handle arrays
  if (Array.isArray(index)) {
    if (index.length === 1) {
      return this[index[0]];
    }
    return this[0];
  }

  let n = +index; // Convert input directly to number

  // If invalid input that converts to NaN
  if (isNaN(n)) {
    n = 0;
  }

  // Convert to integer
  const integer = Math.trunc(n);

  // Calculate the actual index, handling negative indices
  const finalIndex = integer < 0 ? len + integer : integer;

  // Return undefined if index is out of bounds
  if (finalIndex < 0 || finalIndex >= len) {
    return undefined;
  }

  return this[finalIndex];
};

[].at;
[].myAt;
