import {} from "../arrays";

declare global {
  interface Array<T> {
    mySlice(start?: number, end?: number): T[];
  }
}

Array.prototype.mySlice = function (start, end) {
  const len = this.length;
  const result = [];

  let actualStart = parseArgument(start) ?? 0;
  let actualEnd = parseArgument(end) ?? len;

  actualStart = normalizeIndex(actualStart, len);
  actualEnd = normalizeIndex(actualEnd, len);

  actualStart = Math.trunc(actualStart);
  actualEnd = Math.trunc(actualEnd);

  if (actualStart >= actualEnd) {
    return [];
  }

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

function normalizeIndex(index: number, length: number): number {
  if (index < 0) {
    return Math.max(length + index, 0);
  }
  return Math.min(index, length);
}
