import {Dimensions} from 'react-native';
import {useCallback, useEffect} from 'react';
import {useRootDispatch} from '../../utils';
import {updateDimension} from '../../models';
import {DimensionsProps} from './../../models/Device';

export const useAppLoad = () => undefined;
export const useNetInfo = () => undefined;
export const useDeviceInfo = () => undefined;
export const useDimensions = () => {
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
export const useAppState = () => undefined;
export const useKeyboard = () => undefined;
