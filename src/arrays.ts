export function constructTypeErrorMessage(value: unknown) {
  if (value === undefined) {
    return `${value} is not a function`;
  }
  if (value === null) {
    return `${typeof value} ${value} is not a function`;
  }
  if (typeof value === "string") {
    return `${typeof value} "${value}" is not a function`;
  }
  if (typeof value === "number") {
    return `${typeof value} ${value} is not a function`;
  }

  return `${typeof value} is not a function`;
}

// Helper function to convert parameter to number
export function convertToNumber(param: unknown, defaultValue: number): number {
  if (param === undefined) {
    return defaultValue;
  }

  // Handle numeric strings
  if (typeof param === "string" && !isNaN(+param)) {
    return +param;
  }
  // Handle arrays with single numeric item
  else if (Array.isArray(param) && param.length === 1) {
    const item = param[0];
    if (
      (typeof item === "number" && !isNaN(item)) ||
      (typeof item === "string" && !isNaN(+item))
    ) {
      return +item;
    }
  }
  // Handle numbers directly
  else if (typeof param === "number") {
    return param;
  }

  return defaultValue;
}

// Helper function to handle negative indices
export function handleNegativeIndex(index: number, len: number): number {
  if (index < 0) {
    return Math.max(len + index, 0);
  }
  return Math.min(index, len);
}
