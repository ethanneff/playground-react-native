import { useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { updateDimension, useRootDispatch } from '../../redux';
import { DimensionsProps } from '../../redux/Device';

export const useAppLoad = (): void => undefined;
export const useNetInfo = (): void => undefined;
export const useDeviceInfo = (): void => undefined;
export const useDimensions = (): void => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: DimensionsProps) => dispatch(updateDimension(change)),
    [dispatch],
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
    };
  }, [handleChange, dispatch]);
};
export const useAppState = (): void => undefined;
export const useKeyboard = (): void => undefined;
