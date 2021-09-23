import { useIsFocused } from '@react-navigation/native';
import { useRootSelector } from '../../redux';

export const useKeyboardHeight = (): number => {
  const isFocused = useIsFocused();
  const keyboardHeight = useRootSelector(state => state.device.keyboardHeight);
  return isFocused && keyboardHeight ? keyboardHeight : 0;
};
