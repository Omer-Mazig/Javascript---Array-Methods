import {} from "../arrays";

declare global {
  interface Array<T> {
    myFilter<S extends T>(
      predicate: (value: T, index: number, array: T[]) => value is S,
      thisArg?: any
    ): S[];

    myFilter(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any
    ): T[];
  }
}

Array.prototype.myFilter = function (predicate, thisArg) {
  if (typeof predicate !== "function" && this.length === 0) {
    predicate();
  }

  const boundCallback =
    thisArg !== undefined ? predicate.bind(thisArg) : predicate;

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this && boundCallback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

const r1 = [1, 2, "omer"].filter(() => true);
const r2 = [1, 2, "omer"].myFilter(() => true);

const r3 = [1, 2, "omer"].filter((item) => item);
const r4 = [1, 2, "omer"].myFilter((item) => item);

const r5 = [1, 2, "omer"].filter((item) => typeof item === "string");
const r6 = [1, 2, "omer"].myFilter((item) => typeof item === "string");

class X {}
class Y {
  baba() {}
}

const r7 = [new X(), new Y()].filter((item) => item);
const r8 = [new X(), new Y()].myFilter((item) => item);

const r9 = [new X(), new Y()].filter((item) => item instanceof X);
const r10 = [new X(), new Y()].myFilter((item) => item instanceof X);

const r11 = [new X(), new Y()].filter((item) => "baba" in item);
const r12 = [new X(), new Y()].myFilter((item) => "baba" in item);
