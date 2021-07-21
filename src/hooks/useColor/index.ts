import {ColorTheme, useRootSelector} from '../../utils';
import {getCurrentTheme} from './../../models/Theme/index';

export const useColor = (): ColorTheme =>
  useRootSelector(state => getCurrentTheme(state));
