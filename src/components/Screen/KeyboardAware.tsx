import React, { memo } from "react";
import { ViewStyle, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  disableScroll?: boolean;
  style?: ViewStyle | {};
}

export const KeyboardAware: React.FC<Props> = memo(function KeyboardAware({
  disableScroll,
  children,
  style
}) {
  return disableScroll ? 
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
