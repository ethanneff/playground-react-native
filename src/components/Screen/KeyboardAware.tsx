import React, { memo } from "react";
import { ViewStyle, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  scroll?: boolean;
  style?: ViewStyle | {};
}

export const KeyboardAware: React.FC<Props> = memo(function KeyboardAware({
  scroll,
  children,
  style
}) {
  return !scroll ? 
    <View style={style}>{children}</View>
   : 
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={style}
    >
      {children}
    </KeyboardAwareScrollView>
  ;
});
