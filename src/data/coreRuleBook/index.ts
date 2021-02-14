import { Source } from '../models/source';
import { CRBAncestries } from './ancestries';
import { CRBBackgrounds } from './backgrounds';
import { CRBClasses } from './classes';
import { CRBFeats } from './feats';

export const CRB: Source = new Source(
  CRBAncestries,
  CRBBackgrounds,
  CRBFeats,
  CRBClasses
);

export default CRB;
