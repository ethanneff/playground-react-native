import { ColorTheme } from '../Config';
import { getCurrentTheme, useRootSelector } from '../../redux';

export const useColors = (): ColorTheme =>
  useRootSelector((state) => getCurrentTheme(state));
