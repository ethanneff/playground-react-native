import { type DimensionValue } from 'react-native';

type Style =
  | { height: DimensionValue; width?: undefined }
  | { height?: undefined; width: DimensionValue };

export const getSize = (size?: number, horizontal?: boolean): Style => {
  return horizontal ? { width: size ?? '100%' } : { height: size ?? '100%' };
};
