import { Scope } from './Scope';
import { ScopeRef } from './ScopeRef';
import { Version } from './Version';

export interface SAFModel {
  scope: Scope;
  scopes: ScopeRef[];
  versions: Version[];
}