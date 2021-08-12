import {ColorTheme} from '../../features/Config';
import {useRootSelector, getCurrentTheme} from '../../redux';

export const useColor = (): ColorTheme =>
  useRootSelector(state => getCurrentTheme(state));
