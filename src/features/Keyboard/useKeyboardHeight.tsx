import { useIsFocused } from '../../conversions';
import { useAppSelector } from '../../redux';

export const useKeyboardHeight = (): number => {
  const isFocused = useIsFocused();
  const keyboardHeight = useAppSelector((state) => state.device.keyboardHeight);
  return isFocused && keyboardHeight ? keyboardHeight : 0;
};
