import {useRootSelector} from '../../utils';
import {Color, getCurrentColor} from './../../models/Theme';

export const useColor = (): Color =>
  useRootSelector((state) => getCurrentColor(state));
