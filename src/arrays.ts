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
