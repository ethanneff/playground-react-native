import { getCurrentTheme, useRootSelector } from '../../redux';
import { type ColorTheme } from '../Config';

export const useColors = (): ColorTheme => useRootSelector(getCurrentTheme);
