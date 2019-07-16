import * as React from "react";
import { ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  style: ViewStyle | {};
  scrollEnabled: boolean;
}

export const KeyboardAvoid: React.FC<Props> = props => {
  const { style, children, scrollEnabled } = props;
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={style}
      scrollEnabled={scrollEnabled}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
