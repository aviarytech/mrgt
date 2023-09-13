import { Terminology } from "./Terminology.js";
import { ScopeRef } from "./ScopeRef.js";
import { MRGEntry } from "./MRGEntry.js";
export interface MRGModel {
    terminology: Terminology;
    scopes: ScopeRef[];
    entries: MRGEntry[];
}
