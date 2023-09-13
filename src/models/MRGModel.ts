import { Terminology } from './Terminology';
import { ScopeRef } from './ScopeRef';
import { MRGEntry } from './MRGEntry';

export interface MRGModel {
  terminology: Terminology;
  scopes: ScopeRef[];
  entries: MRGEntry[];
}