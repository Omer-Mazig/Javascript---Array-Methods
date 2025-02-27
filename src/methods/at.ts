import {} from "../arrays";

declare global {
  interface Array<T> {
    myAt(index: number): T | undefined;
  }
}

Array.prototype.myAt = function (index: number) {
  const len = this.length;

  if (arguments.length === 0 || index === undefined || index === null) {
    return this[0];
  }

  if (Array.isArray(index)) {
    if (index.length === 1) {
      return this[index[0]];
    }
    return this[0];
  }

  let n = +index;

  if (isNaN(n)) {
    n = 0;
  }

  const integer = Math.trunc(n);

  const finalIndex = integer < 0 ? len + integer : integer;

  if (finalIndex < 0 || finalIndex >= len) {
    return undefined;
  }

  return this[finalIndex];
};

[1].at(1);
[1].myAt(1);
