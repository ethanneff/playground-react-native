import React, {MutableRefObject, useCallback, useRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput as Original,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useColor} from '../../hooks';
import {config} from '../../utils';
import {Button} from '../Button';
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
  removeError?: boolean;
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
  onRef?: MutableRefObject<Original | null>;
  onSubmitEditing?(): void;
}

export const Input = ({
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
  removeError,
  onRef,
  title = '',
  value,
}: Props): JSX.Element => {
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
      position: 'absolute',
      right: 0,
      top: 6,
      width: 30,
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
      borderRadius: config.padding(1),
      borderWidth: 2,
      color: color.text,
      padding: config.padding(2),
      paddingRight: config.padding(8),
      width: '100%',
    },
  });
  const textInput = useRef<Original | null>(null);
  const optionalText = ' - optional';
  const textInputStyles = [
    styles.textInput,
    error ? styles.borderError : undefined,
    focus ? styles.borderFocus : undefined,
    config.fontSizes.body2,
    textStyle,
  ];
  const noValue = value.length === 0;
  const noError = error.length === 0;
  const noTitle = title.length === 0;
  const containerStyles = [flex && styles.flex, containerStyle];

  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(() => setFocus(false), []);
  const focusOnInput = useCallback(
    () => textInput.current && textInput.current.focus(),
    [],
  );
  const textClear = useCallback(() => {
    if (textInput.current) textInput.current.clear();
    onChangeText('');
  }, [onChangeText]);

  const onRefInternal = useCallback(
    ref => {
      textInput.current = ref;
      if (onRef) onRef.current = ref;
    },
    [onRef],
  );

  return (
    <View style={containerStyles}>
      <View style={styles.row}>
        <Button
          activeOpacity={1}
          hidden={noTitle}
          lowercase
          noPadding
          onPress={focusOnInput}
          title={title}
        />
        <Button
          activeOpacity={1}
          color="secondary"
          hidden={!optional}
          lowercase
          noPadding
          onPress={focusOnInput}
          title={optionalText}
        />
      </View>
      <View style={styles.row}>
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
          placeholderTextColor={color.secondary}
          ref={onRefInternal}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          selectionColor={focusColor}
          style={textInputStyles}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={value}
        />
        <Icon
          color={color.secondary}
          hidden={noValue}
          name={clearIcon}
          onPress={textClear}
          style={styles.clear}
        />
      </View>
      {!removeError && (
        <View style={{flexDirection: 'row'}}>
          <Icon
            activeOpacity={1}
            color={color.danger}
            invisible={noError}
            name={errorIcon}
            onPress={focusOnInput}
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
      )}
    </View>
  );
};
