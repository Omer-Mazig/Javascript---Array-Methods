import {} from "../arrays";

declare global {
  interface Array<T> {
    myIncludes(searchElement: T, fromIndex?: number): boolean;
  }
}

// @ts-ignore
Array.prototype.myIncludes = function (searchElement, fromIndex) {
  const len = this.length;

  if (Array.isArray(fromIndex) && fromIndex.length === 0) {
    fromIndex = fromIndex[0];
  }

  if (isNaN(fromIndex)) {
    fromIndex = 0;
  } else {
    fromIndex = +fromIndex;
  }

  fromIndex = normalizeIndex(fromIndex, len);
  fromIndex = Math.trunc(fromIndex);

  for (let i = fromIndex; i < len; i++) {
    if (this[i] === searchElement) {
      return true;
    }
    if (isActuallyNaN(this[i] && isActuallyNaN(searchElement))) {
      return true;
    }
  }
  return false;
};

function isActuallyNaN(value: unknown) {
  return typeof value === "number" && isNaN(value);
}

function normalizeIndex(index: number, length: number): number {
  if (index < 0) {
    return Math.max(length + index, 0);
  }
  return Math.min(index, length);
}
