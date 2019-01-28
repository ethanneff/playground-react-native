import * as React from "react";
import {
  StyleSheet,
  TextInput as Original,
  TextStyle,
  View
} from "react-native";
import { FontSize, Theme } from "../../utils";
import { Clear } from "./Clear";
import { Error } from "./Error";
import { Title } from "./Title";

// styling https://uxdesign.cc/design-better-forms-96fadca0f49c
const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    borderColor: Theme.color.secondary,
    borderWidth: 2,
    borderRadius: Theme.padding.p1,
    padding: Theme.padding.p2,
    paddingRight: Theme.padding.p8,
    marginTop: Theme.padding.p1,
    backgroundColor: Theme.color.background
  },
  borderFocus: {
    borderColor: Theme.color.primary
  },
  borderError: {
    borderColor: Theme.color.danger
  }
});

interface Props {
  title?: string;
  optional?: boolean;
  error?: string;
  style?: TextStyle | {};
  placeholder?: string;
  value: string;
  disableFullscreenUI?: boolean;
  editable?: boolean;
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  onChangeText(text: string): void;
}

interface State {
  focus: boolean;
}

export enum KeyboardType {
  Default = "default",
  Number = "number-pad",
  Decimal = "decimal-pad",
  Numeric = "numeric",
  Email = "email-address",
  Phone = "phone-pad"
}

export enum ReturnKeyType {
  Done = "done",
  Go = "go",
  Next = "next",
  Search = "search",
  Send = "send"
}

export class TextInput extends React.PureComponent<Props, State> {
  public state = {
    focus: false
  };
  private textInput?: Original;

  public render() {
    const {
      title,
      optional,
      error,
      editable = true,
      autoCorrect,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      blurOnSubmit = true,
      placeholder,
      onChangeText,
      value,
      disableFullscreenUI = true,
      style
    } = this.props;
    const { focus } = this.state;
    const textInputStyle = [
      styles.textInput,
      error && styles.borderError,
      focus && styles.borderFocus,
      FontSize.body2,
      style
    ];
    const noValue = value.length === 0;
    return (
      <>
        <Title title={title} optional={optional} onPress={this.focusOnInput} />
        <View style={styles.row}>
          <Original
            ref={input => {
              if (!input) {
                return;
              }
              this.textInput = input;
            }}
            autoCorrect={autoCorrect}
            selectionColor={Theme.color.primary}
            disableFullscreenUI={disableFullscreenUI}
            onFocus={() => this.updateFocus(true)}
            onBlur={() => this.updateFocus(false)}
            editable={editable}
            placeholderTextColor={Theme.color.secondary}
            blurOnSubmit={blurOnSubmit}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            underlineColorAndroid="transparent"
            style={textInputStyle}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
          />
          <Clear hidden={noValue} onPress={this.textClear} />
        </View>
        <Error error={error} onPress={this.focusOnInput} />
      </>
    );
  }

  private updateFocus = (focus: boolean) => {
    this.setState({ focus });
  };

  private focusOnInput = () => {
    if (!this.textInput) {
      return;
    }
    this.textInput.focus();
  };

  private textClear = () => {
    const { onChangeText } = this.props;
    if (!this.textInput) {
      return;
    }
    this.textInput.clear();
    onChangeText("");
  };
}
