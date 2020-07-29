import {Dimensions} from 'react-native';
import {useCallback, useEffect} from 'react';
import {useRootDispatch} from '../../utils';
import {updateDimension} from '../../models';
import {DimensionsProps} from './../../models/Device';

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
    Dimensions.addEventListener('change', handleChange);
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, [handleChange, dispatch]);
};
export const useAppState = (): void => undefined;
export const useKeyboard = (): void => undefined;
