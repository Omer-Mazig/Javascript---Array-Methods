import { constructTypeErrorMessage } from "../arrays";

declare global {
  interface Array<T> {
    myAt();
  }
}

[].at(1);
