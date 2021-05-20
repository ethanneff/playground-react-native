import {ColorTheme, useRootSelector} from '../../utils';
import {getCurrentColor} from './../../models/Theme';

export const useColor = (): ColorTheme =>
  useRootSelector(state => getCurrentColor(state));
