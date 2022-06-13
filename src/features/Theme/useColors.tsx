import { getCurrentTheme, useRootSelector } from '../../redux';
import { ColorTheme } from '../Config';

export const useColors = (): ColorTheme =>
  useRootSelector((state) => getCurrentTheme(state));
