import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myIndexOf(searchElement: T, fromIndex?: number): number;
  }
}

Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
  const len = this.length;

  fromIndex = parseArgument(fromIndex) ?? 0;
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
