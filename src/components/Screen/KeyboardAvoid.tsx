import React, { memo } from "react";
import { ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  style: ViewStyle | {};
  scrollEnabled: boolean;
}

export const KeyboardAvoid: React.FC<Props> = memo(
  ({ style, children, scrollEnabled }) => (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={style}
      scrollEnabled={scrollEnabled}
    >
      {children}
    </KeyboardAwareScrollView>
  )
);
