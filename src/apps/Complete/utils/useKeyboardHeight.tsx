import {useIsFocused} from '@react-navigation/native';
import {useRootSelector} from '../../../utils';

export const useKeyboardHeight = (): number => {
  const isFocused = useIsFocused();
  const keyboardHeight = useRootSelector((s) => s.device.keyboardHeight);
  return isFocused && keyboardHeight ? keyboardHeight : 0;
};
