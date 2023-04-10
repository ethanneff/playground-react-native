import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import {
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { GestureTextInput } from '../../conversions';
import {
  getFontStyles,
  spacing,
  useColors,
  type FontEmphasis,
  type FontType,
  type MonoMultiColor,
} from '../../features';
import { Icon, type IconName } from '../Icon';
import { Pressable } from '../Pressable';
import { Spacing } from '../Spacing';
import { Text } from '../Text';
import { View } from '../View';
import { type PointerEvents, type TextContentType } from './types';

type TextInputIconProps = {
  color?: keyof MonoMultiColor;
  name: IconName;
  onPress: () => void;
  size: number;
};

const TextInputIcon = ({
  color = 'secondary',
  name,
  onPress,
  size,
}: TextInputIconProps) => {
  return (
    <Pressable
      contentStyle={{
        flex: 1,
        justifyContent: 'center',
        padding: spacing(1),
        zIndex: 1,
      }}
      onPress={onPress}
    >
      <Icon
        color={color}
        name={name}
        size={size}
      />
    </Pressable>
  );
};

type AutoComplete =
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-exp'
  | 'cc-number'
  | 'email'
  | 'gender'
  | 'name-family'
  | 'name-given'
  | 'name-middle-initial'
  | 'name-middle'
  | 'name-prefix'
  | 'name-suffix'
  | 'name'
  | 'off'
  | 'password-new'
  | 'password'
  | 'postal-address-country'
  | 'postal-address-extended-postal-code'
  | 'postal-address-extended'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-address'
  | 'postal-code'
  | 'sms-otp'
  | 'street-address'
  | 'tel-country-code'
  | 'tel-device'
  | 'tel-national'
  | 'tel'
  | 'username-new'
  | 'username';

export type TextInputRef = GestureTextInput | null;

type TextInputProps = {
  autoCapitalize: 'characters' | 'none' | 'sentences' | 'words';
  autoComplete: AutoComplete;
  autoCorrect: boolean;
  backgroundColor?: keyof MonoMultiColor;
  blurOnSubmit: boolean;
  color?: keyof MonoMultiColor;
  defaultValue: string;
  disableFullscreenUI?: boolean;
  editable: boolean;
  emphasis?: FontEmphasis;
  error?: string;
  focusOnLoad?: boolean;
  hideError?: boolean;
  iconClear?: boolean;
  iconEdit?: boolean;
  iconEye?: boolean;
  iconHeight?: number;
  iconNext?: boolean;
  iconSend?: boolean;
  keyboardType: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: () => void;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onRef?: MutableRefObject<TextInputRef>;
  onSubmitEditing: () => void;
  placeholder: string;
  pointerEvents?: PointerEvents;
  returnKeyType: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  submitClear?: boolean;
  textContentType: TextContentType;
  title?: string;
  type?: FontType;
};

// eslint-disable-next-line complexity
export const TextInput = memo(function TextInput({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  backgroundColor,
  blurOnSubmit,
  color,
  defaultValue,
  disableFullscreenUI,
  editable,
  emphasis,
  error,
  focusOnLoad,
  hideError,
  iconClear = true,
  iconEdit = true,
  iconEye = true,
  iconHeight = spacing(5),
  iconNext = true,
  iconSend = true,
  keyboardType,
  multiline,
  numberOfLines,
  onBlur,
  onChangeText,
  onFocus,
  onRef,
  onSubmitEditing,
  placeholder,
  pointerEvents,
  returnKeyType,
  secureTextEntry,
  style,
  submitClear,
  textContentType = 'none',
  title,
  type,
}: TextInputProps) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [errorState, setErrorState] = useState(error);
  const [secure, setSecure] = useState(secureTextEntry);
  const textInput = useRef<TextInputRef>(null);
  const colors = useColors();
  const backColor = backgroundColor
    ? colors.background[backgroundColor]
    : 'transparent';
  const { fontSize, textColor } = getFontStyles({
    color,
    colors,
    emphasis,
    type,
  });
  const hasLength = value.trim().length > 0;

  const onChangeTextInternal = useCallback(
    (val: string) => {
      setValue(val);
      onChangeText(val);
      setErrorState('');
    },
    [onChangeText],
  );

  const onSubmitEditingInternal = useCallback(() => {
    onSubmitEditing();
    if (!submitClear) return;
    setValue('');
  }, [onSubmitEditing, submitClear]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  const onFocusInternal = useCallback(() => {
    setFocus(true);
    if (onFocus) onFocus();
  }, [onFocus]);

  const onBlurInternal = useCallback(() => {
    setFocus(false);
    if (onBlur) onBlur();
  }, [onBlur]);

  const onInternalRef = useCallback(
    (ref: TextInputRef) => {
      if (!ref) return;
      textInput.current = ref;
      if (onRef) onRef.current = ref;
    },
    [onRef],
  );

  const handleEyePress = useCallback(() => {
    setSecure((prev) => !prev);
  }, []);

  const handleTitlePress = useCallback(() => {
    textInput.current?.focus();
  }, []);

  const handleLayout = useCallback(() => {
    if (!focusOnLoad) return;
    textInput.current?.focus();
  }, [focusOnLoad]);

  useEffect(() => {
    setErrorState(error);
  }, [error]);

  return (
    <View
      flex={1}
      style={style}
    >
      {title ? (
        <>
          <Text
            onPress={handleTitlePress}
            title={title}
          />
          <Spacing padding={spacing(1)} />
        </>
      ) : null}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: backColor,
          borderBottomColor: focus
            ? colors.text.accent
            : errorState
            ? colors.text.negative
            : backColor,
          borderLeftColor: backColor,
          borderRadius: spacing(1),
          borderRightColor: backColor,
          borderTopColor: backColor,
          borderWidth: 2,
          flexDirection: 'row',
        }}
      >
        <GestureTextInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          blurOnSubmit={blurOnSubmit}
          defaultValue={defaultValue}
          disableFullscreenUI={disableFullscreenUI}
          editable={editable}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={onBlurInternal}
          onChangeText={onChangeTextInternal}
          onFocus={onFocusInternal}
          onLayout={handleLayout}
          onSubmitEditing={onSubmitEditingInternal}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          pointerEvents={pointerEvents}
          ref={onInternalRef}
          returnKeyType={returnKeyType}
          secureTextEntry={secure}
          selectionColor={colors.text.accent}
          style={{
            color: textColor,
            flex: 1,
            padding: spacing(2),
            ...fontSize,
          }}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={value}
        />
        <View
          alignContent="center"
          alignItems="center"
          alignSelf="flex-end"
          flexDirection="row"
          justifyContent="center"
          style={{ paddingRight: spacing(1) }}
        >
          {iconClear && editable && hasLength ? (
            <TextInputIcon
              name="close"
              onPress={handleClear}
              size={iconHeight}
            />
          ) : null}
          {iconEye && editable && hasLength ? (
            <TextInputIcon
              name={secure ? 'eye-outline' : 'eye-off-outline'}
              onPress={handleEyePress}
              size={iconHeight}
            />
          ) : null}
          {iconSend && editable && hasLength && focus ? (
            <TextInputIcon
              color="accent"
              name="send"
              onPress={onSubmitEditing}
              size={iconHeight}
            />
          ) : null}
          {iconEdit && editable && hasLength ? (
            <TextInputIcon
              color="secondary"
              name="dots-horizontal"
              onPress={onSubmitEditing}
              size={iconHeight}
            />
          ) : null}
          {iconNext && editable && hasLength ? (
            <TextInputIcon
              color="secondary"
              name="chevron-right"
              onPress={onSubmitEditing}
              size={iconHeight}
            />
          ) : null}
        </View>
      </View>
      <View
        alignItems="center"
        display={hideError ? 'none' : 'flex'}
        flexDirection="row"
        opacity={errorState ? 1 : 0}
        padding={spacing(1)}
      >
        <Icon
          color="negative"
          name="alarm"
          size={spacing(4)}
        />
        <Text
          color="negative"
          title=" "
        />
        <Text
          color="negative"
          title={errorState}
        />
      </View>
    </View>
  );
});
