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
  fromIndex = roundNumber(fromIndex);

  for (let i = fromIndex; i < len; i++) {
    if (this[i] === searchElement) {
      return true;
    }
  }
  return false;
};

function normalizeIndex(index: number, length: number): number {
  if (index < 0) {
    return Math.max(length + index, 0);
  }
  return Math.min(index, length);
}

function roundNumber(n: number) {
  n > 0 ? (n = Math.floor(n)) : Math.ceil(n);
  return n;
}
