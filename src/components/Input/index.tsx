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
  TextStyle,
  ViewStyle,
} from 'react-native';
import { View } from '../../components';
import { GestureTextInput } from '../../conversions';
import { fontSizes, SoundManager, spacing, useColors } from '../../features';
import { SuperAny } from '../../types/types';
import { Icon, IconName } from '../Icon';
import { Text } from '../Text';
import { TextInputRef } from '../TextInput';
import { TouchableOpacity } from '../TouchableOpacity';

// styling https://uxdesign.cc/design-better-forms-96fadca0f49c

type TextContentType = 'username' | 'password' | 'none';

// TODO: fix blurOnSubmit=false

type Props = {
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  clearIcon?: IconName;
  containerStyle?: StyleProp<ViewStyle>;
  disableFullscreenUI?: boolean;
  editable?: boolean;
  error?: string;
  errorIcon?: IconName;
  flex?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText(text: string): void;
  onRef?: MutableRefObject<TextInputRef>;
  onSubmitEditing?: () => void;
  optional?: boolean;
  placeholder?: string;
  removeError?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  textContentType?: TextContentType;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
  value: string;
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
  onRef,
  onSubmitEditing,
  optional,
  placeholder,
  removeError,
  returnKeyType,
  secureTextEntry,
  textContentType = 'none',
  textStyle,
  title = '',
  value,
}: Props) {
  const [focus, setFocus] = useState(false);
  const colors = useColors();
  const styles = StyleSheet.create({
    clear: {
      paddingLeft: spacing(2),
    },
    flex: {
      flex: 1,
    },
    input: {
      backgroundColor: colors.background.primaryA,
      borderColor: error
        ? colors.text.negative
        : focus
        ? colors.text.accent
        : colors.text.secondary,
      borderRadius: spacing(1),
      borderWidth: 2,
      flexDirection: 'row',
      padding: spacing(2),
    },
    row: {
      flexDirection: 'row',
    },
    textInput: {
      color: colors.text.primaryA,
      flex: 1,
    },
  });
  const textInput = useRef<TextInputRef>(null);
  const optionalText = ' - optional';
  const textInputStyles = [styles.textInput, fontSizes.body2, textStyle];
  const noValue = value.length === 0;
  const noTitle = title.length === 0;
  const containerStyles = [flex && styles.flex, containerStyle];

  const onFocus = useCallback(() => {
    SoundManager.play('tap');
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => setFocus(false), []);
  const focusOnInput = useCallback(() => textInput.current?.focus(), []);
  const textClear = useCallback(() => {
    if (textInput.current) textInput.current.clear();
    onChangeText('');
  }, [onChangeText]);

  const onRefInternal = useCallback(
    (ref: SuperAny) => {
      textInput.current = ref;
      if (onRef) onRef.current = ref;
    },
    [onRef],
  );

  return (
    <View style={containerStyles}>
      <View style={styles.row}>
        <Text
          hidden={noTitle}
          onPress={focusOnInput}
          title={title}
        />
        <Text
          color="secondary"
          hidden={!optional}
          onPress={focusOnInput}
          title={optionalText}
        />
      </View>
      <View style={styles.input}>
        <GestureTextInput
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
          placeholderTextColor={colors.text.secondary}
          ref={onRefInternal}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          selectionColor={colors.text.accent}
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
        <TouchableOpacity
          onPress={focusOnInput}
          style={{ alignItems: 'center', flexDirection: 'row' }}
        >
          <Icon
            color="negative"
            invisible={!error.length}
            name={errorIcon}
            size={spacing(4)}
          />
          <Text
            color="negative"
            invisible={!error.length}
            style={{ paddingLeft: spacing(1) }}
            title={error || ' '}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
