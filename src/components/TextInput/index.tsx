import React, {useCallback, useRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput as Original,
  View,
  ViewStyle,
} from 'react-native';
import {useColor} from '../../hooks';
import {Color} from '../../models';
import {FontEmphasis, FontType, getFontStyles, Theme} from '../../utils';

/*
styling https://uxdesign.cc/design-better-forms-96fadca0f49c
*/

type TextContentType = 'username' | 'password' | 'none';

interface Props {
  type?: FontType;
  emphasis?: FontEmphasis;
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  disableFullscreenUI?: boolean;
  editable?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  textContentType?: TextContentType;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: keyof Color;
  value: string;
  flex?: boolean;
  onChangeText(text: string): void;
  onSubmitEditing?(): void;
}

export const TextInput = ({
  autoCorrect,
  blurOnSubmit = true,
  disableFullscreenUI = true,
  editable = true,
  error = '',
  keyboardType,
  onChangeText,
  onSubmitEditing,
  placeholder,
  returnKeyType,
  secureTextEntry,
  textContentType = 'none',
  style,
  value,
  color,
  emphasis,
  type,
  flex,
}: Props): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const colorScheme = useColor();
  const focusColor = colorScheme.primary;
  const {fontSize, textColor} = getFontStyles({
    emphasis,
    type,
    color,
    colorScheme,
  });
  const styles = StyleSheet.create({
    borderError: {
      borderColor: colorScheme.danger,
    },
    borderFocus: {
      borderColor: focusColor,
    },
    textInput: {
      backgroundColor: colorScheme.background,
      borderBottomWidth: 2,
      borderColor: colorScheme.background,
      borderRadius: Theme.padding.p01,
      color: textColor,
      flex: 1,
      padding: Theme.padding.p02,
      paddingRight: Theme.padding.p08,
    flex: {
      flex: 1,
    },
  });
  const textInput = useRef<Original>(null);
  const textInputStyles = [
    styles.textInput,
    fontSize,
    error ? styles.borderError : undefined,
    focus ? styles.borderFocus : undefined,
    style,
  ];
  const containerStyles = [flex ? styles.flex : undefined];

  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(() => setFocus(false), []);

  return (
    <View style={containerStyles}>
      <Original
        autoCorrect={autoCorrect}
        blurOnSubmit={blurOnSubmit}
        disableFullscreenUI={disableFullscreenUI}
        editable={editable}
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colorScheme.secondary}
        ref={onInternalRef}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        selectionColor={focusColor}
        style={textInputStyles}
        textContentType={textContentType}
        underlineColorAndroid="transparent"
        value={value}
      />
    </View>
  );
};
