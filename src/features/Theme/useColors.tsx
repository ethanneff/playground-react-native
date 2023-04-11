import { getCurrentTheme, useAppSelector } from '../../redux';
import { type ColorTheme } from '../Config';

export const useColors = (): ColorTheme => useAppSelector(getCurrentTheme);
