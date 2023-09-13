import { Scope } from "./Scope.js";
import { ScopeRef } from "./ScopeRef.js";
import { Version } from "./Version.js";

export interface SAFModel {
  scope: Scope;
  scopes: ScopeRef[];
  versions: Version[];
}
