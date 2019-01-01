import * as React from "react";
import { ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  style: ViewStyle | {};
  scrollEnabled: boolean;
}

export class KeyboardAvoid extends React.PureComponent<Props> {
  public render() {
    const { style, children, scrollEnabled } = this.props;
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style}
        scrollEnabled={scrollEnabled}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
}
