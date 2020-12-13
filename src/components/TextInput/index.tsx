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
  focusOnLoad?: boolean;
  disableFullscreenUI?: boolean;
  backgroundColor?: string;
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
  focusOnLoad,
  editable = true,
  error = '',
  backgroundColor,
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
  const backColor = backgroundColor || colorScheme.background;
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
    flex: {
      flex: 1,
    },
    textInput: {
      backgroundColor: backColor,
      borderBottomWidth: 2,
      borderColor: backColor,
      borderRadius: Theme.padding.p01,
      color: textColor,
      marginLeft: Theme.padding.p02,
      padding: Theme.padding.p02,
    },
  });
  const textInput = useRef<Original | null>(null);
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
  const onInternalRef = useCallback(
    (ref: Original | null) => {
      if (!ref) {
        return;
      }
      if (!textInput.current && focusOnLoad) {
        ref.focus();
      }
      textInput.current = ref;
    },
    [focusOnLoad, textInput],
  );

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
