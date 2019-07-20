/* 
styling https://uxdesign.cc/design-better-forms-96fadca0f49c
*/

import * as React from "react";
import {
  StyleSheet,
  TextInput as Original,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { Theme } from "../../utils";
import { Button } from "../Button";

interface Props {
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  clearIcon?: string;
  disableFullscreenUI?: boolean;
  editable?: boolean;
  error?: string;
  errorIcon?: string;
  flex?: boolean;
  hasError?: boolean;
  keyboardType?: KeyboardType;
  optional?: boolean;
  placeholder?: string;
  returnKeyType?: ReturnKeyType;
  secureTextEntry?: boolean;
  textStyle?: TextStyle | {};
  containerStyle?: ViewStyle | {};
  title?: string;
  value: string;
  onChangeText(text: string): void;
}

interface State {
  focus: boolean;
}

export enum KeyboardType {
  Decimal = "decimal-pad",
  Default = "default",
  Email = "email-address",
  Number = "number-pad",
  Numeric = "numeric",
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
  private focusColor = Theme.color.primary;

  private styles = StyleSheet.create({
    borderError: {
      borderColor: Theme.color.danger
    },
    borderFocus: {
      borderColor: this.focusColor
    },
    clear: {
      position: "absolute",
      right: -2,
      top: 2
    },
    flex: {
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
  private optionalText = " - optional";

  public render() {
    const {
      autoCorrect,
      blurOnSubmit = true,
      clearIcon = "close-circle",
      containerStyle,
      disableFullscreenUI = true,
      editable = true,
      error = "",
      errorIcon = "alert-circle",
      flex,
      keyboardType,
      onChangeText,
      optional,
      placeholder,
      returnKeyType,
      secureTextEntry,
      textStyle,
      title = "",
      value
    } = this.props;
    const { focus } = this.state;
    const textInputStyles = [
      this.styles.textInput,
      error && this.styles.borderError,
      focus && this.styles.borderFocus,
      Theme.fontSize.body2,
      textStyle
    ];
    const noValue = value.length === 0;
    const noError = error.length === 0;
    const noTitle = title.length === 0;
    const containerStyles = [flex && this.styles.flex, containerStyle];
    return (
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
            autoCorrect={autoCorrect}
            blurOnSubmit={blurOnSubmit}
            disableFullscreenUI={disableFullscreenUI}
            editable={editable}
            keyboardType={keyboardType}
            onBlur={this.onBlur}
            onChangeText={onChangeText}
            onFocus={this.onFocus}
            placeholder={placeholder}
            placeholderTextColor={Theme.color.secondary}
            ref={input => (this.textInput = input ? input : undefined)}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            selectionColor={this.focusColor}
            style={textInputStyles}
            underlineColorAndroid="transparent"
            value={value}
          />
          <Button
            buttonStyle={this.styles.clear}
            hidden={noValue}
            icon={clearIcon}
            onPress={this.textClear}
            secondary
          />
        </View>
        <Button
          activeOpacity={1}
          danger
          icon={errorIcon}
          invisible={noError}
          label
          lowercase
          onPress={this.focusOnInput}
          title={error}
          wrap
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
