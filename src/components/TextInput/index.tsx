import React, {useRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  TextInput as Original,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../utils';
import {Button} from '../Button';
import {useColor} from '../../hooks';
import {Icon} from '../Icon';

/*
styling https://uxdesign.cc/design-better-forms-96fadca0f49c
*/

type TextContentType = 'username' | 'password' | 'none';

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
  keyboardType?: KeyboardTypeOptions;
  optional?: boolean;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  textContentType?: TextContentType;
  secureTextEntry?: boolean;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  value: string;
  onChangeText(text: string): void;
  onSubmitEditing?(): void;
}

export const TextInput: React.FC<Props> = ({
  autoCorrect,
  blurOnSubmit = true,
  clearIcon = 'close-circle',
  containerStyle,
  disableFullscreenUI = true,
  editable = true,
  error = '',
  errorIcon = 'alert-circle',
  flex,
  keyboardType,
  onChangeText,
  onSubmitEditing,
  optional,
  placeholder,
  returnKeyType,
  secureTextEntry,
  textContentType = 'none',
  textStyle,
  title = '',
  value,
}) => {
  const [focus, setFocus] = useState(false);
  const color = useColor();
  const focusColor = color.primary;
  const styles = StyleSheet.create({
    borderError: {
      borderColor: color.danger,
    },
    borderFocus: {
      borderColor: focusColor,
    },
    clear: {
      width: 30,
      position: 'absolute',
      right: 0,
      top: 6,
    },
    flex: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    textInput: {
      backgroundColor: color.background,
      borderColor: color.secondary,
      borderRadius: Theme.padding.p01,
      borderWidth: 2,
      color: color.text,
      padding: Theme.padding.p02,
      paddingRight: Theme.padding.p08,
      width: '100%',
    },
  });
  const textInput = useRef<Original>(null);
  const optionalText = ' - optional';
  const textInputStyles = [
    styles.textInput,
    error ? styles.borderError : undefined,
    focus ? styles.borderFocus : undefined,
    Theme.fontSize.body2,
    textStyle,
  ];
  const noValue = value.length === 0;
  const noError = error.length === 0;
  const noTitle = title.length === 0;
  const containerStyles = [flex && styles.flex, containerStyle];

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const focusOnInput = () => textInput.current && textInput.current.focus();
  const textClear = () => {
    if (textInput.current) {
      textInput.current.clear();
    }
    onChangeText('');
  };

  return (
    <View style={containerStyles}>
      <View style={styles.row}>
        <Button
          activeOpacity={1}
          hidden={noTitle}
          lowercase
          onPress={focusOnInput}
          title={title}
          noPadding
        />
        <Button
          activeOpacity={1}
          hidden={!optional}
          lowercase
          onPress={focusOnInput}
          color="secondary"
          title={optionalText}
          noPadding
        />
      </View>
      <View style={styles.row}>
        <Original
          textContentType={textContentType}
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
        <Icon
          style={styles.clear}
          hidden={noValue}
          name={clearIcon}
          onPress={textClear}
          color={color.secondary}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Icon
          activeOpacity={1}
          invisible={noError}
          name={errorIcon}
          onPress={focusOnInput}
          color={color.danger}
        />
        <Button
          activeOpacity={1}
          color="danger"
          invisible={noError}
          lowercase
          noPadding
          onPress={focusOnInput}
          title={error}
        />
      </View>
    </View>
  );
};
