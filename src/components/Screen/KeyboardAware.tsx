import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const KeyboardAware: React.FC<Props> = ({scroll, children, style}) => {
  return !scroll ? (
    <View style={style}>{children}</View>
  ) : (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={style}>
      {children}
    </KeyboardAwareScrollView>
  );
};
