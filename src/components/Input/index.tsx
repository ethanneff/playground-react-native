import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import {
  StyleSheet,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { View } from '../../components';
import { GestureTextInput } from '../../conversions';
import { SoundManager, fontSizes, spacing, useColors } from '../../features';
import { Icon, type IconName } from '../Icon';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { type TextInputRef } from '../TextInput';

// styling https://uxdesign.cc/design-better-forms-96fadca0f49c

type TextContentType = 'none' | 'password' | 'username';

// TODO: fix blurOnSubmit=false

type Props = {
  readonly autoCorrect?: boolean;
  readonly blurOnSubmit?: boolean;
  readonly clearIcon?: IconName;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly disableFullscreenUI?: boolean;
  readonly editable?: boolean;
  readonly error?: string;
  readonly errorIcon?: IconName;
  readonly flex?: boolean;
  readonly focusOnMount?: boolean;
  readonly hideError?: boolean;
  readonly keyboardType?: KeyboardTypeOptions;
  readonly onChangeText: (text: string) => void;
  readonly onRef?: MutableRefObject<TextInputRef>;
  readonly onSubmitEditing?: () => void;
  readonly optional?: boolean;
  readonly placeholder?: string;
  readonly returnKeyType?: ReturnKeyTypeOptions;
  readonly secureTextEntry?: boolean;
  readonly textContentType?: TextContentType;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly title?: string;
  readonly value: string;
};

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
  focusOnMount,
  hideError,
  keyboardType,
  onChangeText,
  onRef,
  onSubmitEditing,
  optional,
  placeholder,
  returnKeyType,
  secureTextEntry,
  textContentType = 'none',
  textStyle,
  title = '',
  value,
}: Props) => {
  const fromOnMount = useRef(false);
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
    if (!fromOnMount.current) SoundManager.play('tap');
    fromOnMount.current = false;
    setFocus(true);
  }, []);

  useEffect(() => {
    if (!focusOnMount) return;
    fromOnMount.current = true;
    textInput.current?.focus();
  }, [focusOnMount, onFocus]);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleOnFocus = useCallback(() => {
    textInput.current?.focus();
  }, []);

  const textClear = useCallback(() => {
    if (textInput.current) textInput.current.clear();
    onChangeText('');
  }, [onChangeText]);

  const onRefInternal = useCallback(
    (ref: GestureTextInput) => {
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
          onPress={handleOnFocus}
          title={title}
          withoutTap
        />
        <Text
          color="secondary"
          hidden={!optional}
          onPress={handleOnFocus}
          title={optionalText}
          withoutTap
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
        <Pressable onPress={textClear}>
          <Icon
            color="tertiary"
            hidden={noValue}
            name={clearIcon}
            style={styles.clear}
          />
        </Pressable>
      </View>
      {!hideError && (
        <Pressable
          disabled={!error.length}
          onPress={handleOnFocus}
        >
          <View
            alignItems="center"
            flexDirection="row"
            paddingVertical={spacing(1)}
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
          </View>
        </Pressable>
      )}
    </View>
  );
};
