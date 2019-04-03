import * as React from "react";
import {
  StyleSheet,
  TextInput as Original,
  TextStyle,
  View
} from "react-native";
import { Button } from "..";
import { Theme } from "../../utils";
import { Title } from "./Title";

interface Props {
  title?: string;
  optional?: boolean;
  error?: string;
  hasError?: boolean;
  errorIcon?: string;
  clearIcon?: string;
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
  // styling https://uxdesign.cc/design-better-forms-96fadca0f49c
  private styles = StyleSheet.create({
    borderError: {
      borderColor: Theme.color.danger
    },
    borderFocus: {
      borderColor: Theme.color.primary
    },
    clear: {
      position: "absolute",
      right: -6,
      top: 6
    },
    container: {
      flex: 1
    },
    row: {
      flexDirection: "row"
    },
    textInput: {
      backgroundColor: Theme.color.background,
      borderColor: Theme.color.secondary,
      borderRadius: Theme.padding.p01,
      borderWidth: 2,
      padding: Theme.padding.p02,
      paddingRight: Theme.padding.p08,
      width: "100%"
    }
  });
  private textInput?: Original;

  public render() {
    const {
      title,
      optional,
      error = "",
      editable = true,
      autoCorrect,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      blurOnSubmit = true,
      placeholder,
      onChangeText,
      value,
      hasError,
      disableFullscreenUI = true,
      errorIcon = "alert-circle",
      clearIcon = "close-circle",
      style
    } = this.props;
    const { focus } = this.state;
    const textInputStyle = [
      this.styles.textInput,
      error && this.styles.borderError,
      focus && this.styles.borderFocus,
      Theme.fontSize.body2,
      style
    ];
    const noValue = value.length === 0;
    return (
      <View style={this.styles.container}>
      <View style={containerStyles}>
        <View style={this.styles.row}>
          <Button
            activeOpacity={1}
            hidden={noTitle}
            label
            lowercase
            neutral
            onPress={this.focusOnInput}
            title={title}
            wrap
          />
          <Button
            activeOpacity={1}
            hidden={!optional}
            label
            lowercase
            onPress={this.focusOnInput}
            secondary
            title={this.optionalText}
            wrap
          />
        </View>
        <View style={this.styles.row}>
          <Original
            ref={input => (this.textInput = input ? input : undefined)}
            autoCorrect={autoCorrect}
            selectionColor={Theme.color.primary}
            disableFullscreenUI={disableFullscreenUI}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
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
          <Button
            secondary
            hidden={noValue}
            icon={clearIcon}
            buttonStyle={this.styles.clear}
            onPress={this.textClear}
          />
        </View>
        <Button
          hidden={!hasError}
          label
          wrap
          lowercase
          activeOpacity={1}
          icon={errorIcon}
          title={error}
          danger
          onPress={this.focusOnInput}
        />
      </View>
    );
  }

  private onFocus = () => this.setState({ focus: true });

  private onBlur = () => this.setState({ focus: false });

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
