import {useRootSelector} from '../../utils';
import {getCurrentColor} from './../../models/Theme';

export const useColor = () =>
  useRootSelector((state) => getCurrentColor(state));
