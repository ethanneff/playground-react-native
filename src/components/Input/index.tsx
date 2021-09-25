import React, {
  memo,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
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
import { fontSizes, padding } from '../../features/Config';
import { useColor } from '../../features/Theme';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';

// styling https://uxdesign.cc/design-better-forms-96fadca0f49c

type TextContentType = 'username' | 'password' | 'none';

// TODO: fix blurOnSubmit=false

type Props = {
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
  onSubmitEditing?: () => void;
};

export const Input = memo(function Input({
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
}: Props) {
  const [focus, setFocus] = useState(false);
  const color = useColor();
  const styles = StyleSheet.create({
    clear: {
      paddingLeft: padding(2),
    },
    flex: {
      flex: 1,
    },
    input: {
      backgroundColor: color.background.primaryA,
      borderColor: error
        ? color.text.negative
        : focus
        ? color.text.accent
        : color.text.secondary,
      borderRadius: padding(1),
      borderWidth: 2,
      flexDirection: 'row',
      padding: padding(2),
    },
    row: {
      flexDirection: 'row',
    },
    textInput: {
      color: color.text.primaryA,
      flex: 1,
    },
  });
  const textInput = useRef<Original | null>(null);
  const optionalText = ' - optional';
  const textInputStyles = [styles.textInput, fontSizes.body2, textStyle];
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
    (ref) => {
      textInput.current = ref;
      if (onRef) onRef.current = ref;
    },
    [onRef],
  );

  return (
    <View style={containerStyles}>
      <View style={styles.row}>
        <Text hidden={noTitle} onPress={focusOnInput} title={title} />
        <Text
          color="secondary"
          hidden={!optional}
          onPress={focusOnInput}
          title={optionalText}
        />
      </View>
      <View style={styles.input}>
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
          placeholderTextColor={color.text.secondary}
          ref={onRefInternal}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          selectionColor={color.text.accent}
          style={textInputStyles}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={value}
        />
        <TouchableOpacity onPress={textClear}>
          <Icon
            color="tertiary"
            hidden={noValue}
            name={clearIcon}
            style={styles.clear}
          />
        </TouchableOpacity>
      </View>
      {!removeError && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={1} onPress={focusOnInput}>
            <Icon color="negative" invisible={noError} name={errorIcon} />
          </TouchableOpacity>
          <Button
            activeOpacity={1}
            color="negative"
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
});
