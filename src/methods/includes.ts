import {} from "../arrays";

declare global {
  interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    myIncludes(searchElement: T, fromIndex?: number): boolean;
  }
}

Array.prototype.myIncludes = function <T>(
  this: T[],
  searchElement: T,
  fromIndex?: number
): boolean {
  const len = this.length;
};
