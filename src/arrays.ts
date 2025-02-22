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
export function convertToNumber(param: unknown): number {
  // Handle numeric strings
  if (typeof param === "string" && !isNaN(+param)) {
    return roundNumber(+param);
  }
  // Handle arrays with single numeric item
  else if (Array.isArray(param) && param.length === 1) {
    const item = param[0];
    if (
      (typeof item === "number" && !isNaN(item)) ||
      (typeof item === "string" && !isNaN(+item))
    ) {
      return roundNumber(+item);
    }
  }
  // Handle numbers directly
  else if (typeof param === "number" && !isNaN(param)) {
    return roundNumber(+param);
  }

  return 0;
}

// Helper function to handle negative indices
export function handleNegativeIndex(index: number, len: number): number {
  if (index < 0) {
    return Math.max(len + index, 0);
  }
  return Math.min(index, len);
}

function roundNumber(number: number) {
  return number > 0 ? Math.floor(number) : Math.ceil(number);
}
