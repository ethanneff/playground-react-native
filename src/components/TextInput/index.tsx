import React, { memo, useRef, useState } from "react";
import {
  TextInput as Original,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { Theme } from "../../utils";
import { Button } from "../Button";
import { useColor } from "../../hooks";

/* 
styling https://uxdesign.cc/design-better-forms-96fadca0f49c
*/

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
  onSubmitEditing?(): void;
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

export const TextInput: React.FC<Props> = memo(
  ({
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
    onSubmitEditing,
    optional,
    placeholder,
    returnKeyType,
    secureTextEntry,
    textStyle,
    title = "",
    value
  }) => {
    const [focus, setFocus] = useState(false);
    const color = useColor();
    const focusColor = color.primary;
    const styles = StyleSheet.create({
      borderError: {
        borderColor: color.danger
      },
      borderFocus: {
        borderColor: focusColor
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
        backgroundColor: color.background,
        borderColor: color.secondary,
        borderRadius: Theme.padding.p01,
        borderWidth: 2,
        color: color.text,
        padding: Theme.padding.p02,
        paddingRight: Theme.padding.p08,
        width: "100%"
      }
    });
    const textInput = useRef<Original>(null);
    const optionalText = " - optional";
    const textInputStyles = [
      styles.textInput,
      error && styles.borderError,
      focus && styles.borderFocus,
      Theme.fontSize.body2,
      textStyle
    ];
    const noValue = value.length === 0;
    const noError = error.length === 0;
    const noTitle = title.length === 0;
    const containerStyles = [flex && styles.flex, containerStyle];

    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);
    const focusOnInput = () => textInput.current && textInput.current.focus();
    const textClear = () =>
      textInput.current && textInput.current.clear() && onChangeText("");

    return (
      <View style={containerStyles}>
        <View style={styles.row}>
          <Button
            activeOpacity={1}
            hidden={noTitle}
            label
            lowercase
            neutral
            onPress={focusOnInput}
            title={title}
            wrap
          />
          <Button
            activeOpacity={1}
            hidden={!optional}
            label
            lowercase
            onPress={focusOnInput}
            secondary
            title={optionalText}
            wrap
          />
        </View>
        <View style={styles.row}>
          <Original
            autoCorrect={autoCorrect}
            blurOnSubmit={blurOnSubmit}
            disableFullscreenUI={disableFullscreenUI}
            editable={editable}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onFocus={onFocus}
            placeholder={placeholder}
            placeholderTextColor={color.secondary}
            ref={textInput}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            selectionColor={focusColor}
            style={textInputStyles}
            underlineColorAndroid="transparent"
            value={value}
          />
          <Button
            buttonStyle={styles.clear}
            hidden={noValue}
            icon={clearIcon}
            onPress={textClear}
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
          onPress={focusOnInput}
          title={error}
          wrap
        />
      </View>
    );
  }
);
