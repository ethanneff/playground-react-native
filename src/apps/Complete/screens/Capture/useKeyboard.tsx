import {useCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';

const android = Platform.OS === 'android';
const show = android ? 'keyboardDidShow' : 'keyboardWillShow';
const hide = android ? 'keyboardDidHide' : 'keyboardWillHide';

type UseKeyboard = {
  keyboardHeight: number;
  dismissKeyboard: () => void;
};
export const useKeyboard = (): UseKeyboard => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = useCallback((e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  }, []);

  const onKeyboardDidHide = useCallback(() => {
    setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    Keyboard.addListener(show, onKeyboardDidShow);
    Keyboard.addListener(hide, onKeyboardDidHide);
    return () => {
      Keyboard.removeListener(show, onKeyboardDidShow);
      Keyboard.removeListener(hide, onKeyboardDidHide);
    };
  }, [onKeyboardDidHide, onKeyboardDidShow]);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return {keyboardHeight, dismissKeyboard};
};
