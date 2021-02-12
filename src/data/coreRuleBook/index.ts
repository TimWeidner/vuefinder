import { Source } from '../models/source';
import { CRBAncestries } from './ancestries';
import { CRBBackgrounds } from './backgrounds';
import { CRBFeats } from './feats';

export const CRB: Source = new Source(CRBAncestries, CRBBackgrounds, CRBFeats);

export default CRB;
