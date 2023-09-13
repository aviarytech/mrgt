import { Term } from "./Term.js";

export interface MRGEntry extends Term {
  headingids: string[];
  locator: string;
  navurl: string;
}
