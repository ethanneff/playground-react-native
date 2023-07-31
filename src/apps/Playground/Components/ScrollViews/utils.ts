import { type DimensionValue } from 'react-native';

export const getSize = (
  size?: number,
  horizontal?: boolean,
): { height?: DimensionValue; width?: DimensionValue } =>
  horizontal ? { width: size ?? '100%' } : { height: size ?? '100%' };
