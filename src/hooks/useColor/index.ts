import {getCurrentColor} from './../../models/Theme';
import {useRootSelector} from '../../utils';

export const useColor = () =>
  useRootSelector((state) => getCurrentColor(state));
