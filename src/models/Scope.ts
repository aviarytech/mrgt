import { Curator } from './Curator';

export class Scope {
  scopetag: string;
  scopedir: string;
  curatedir: string;
  glossarydir: string;
  mrgfile: string;
  hrgfile: string;
  license: string;
  statuses: string[];
  issues: string;
  website: string;
  slack: string;
  curators: Curator[];
}