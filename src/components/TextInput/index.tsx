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

export type TextInputIcon = {
  clear?: boolean;
  color?: keyof MonoMultiColor;
  focus?: boolean;
  hidden?: boolean;
  name: IconName;
  onPress: (text: string) => void;
  required?: boolean;
  reset?: boolean;
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
  disableFullscreenUI?: boolean;
  editable: boolean;
  emphasis?: FontEmphasis;
  error?: boolean;
  focusOnLoad?: boolean;
  iconHeight?: number;
  icons?: TextInputIcon[];
  keyboardType: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: (text: string) => void;
  onChangeText: (text: string) => void;
  onFocus?: (text: string) => void;
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
  value: string;
};

export const TextInput = memo(function TextInput({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  backgroundColor,
  blurOnSubmit,
  color,
  disableFullscreenUI,
  editable,
  emphasis,
  error,
  focusOnLoad,
  iconHeight = spacing(5),
  icons = [],
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
  value = '',
}: TextInputProps) {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(value);
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

  const textInput = useRef<TextInputRef>(null);

  const onChangeTextInternal = useCallback(
    (val: string) => {
      setText(val);
      onChangeText(val);
    },
    [onChangeText],
  );

  const onSubmitEditingInternal = useCallback(() => {
    onSubmitEditing();
    if (submitClear) setText('');
  }, [onSubmitEditing, submitClear]);

  const onFocusInternal = useCallback(() => {
    setFocus(true);
    if (onFocus) onFocus(text);
  }, [onFocus, text]);

  const onBlurInternal = useCallback(() => {
    setFocus(false);
    if (onBlur) onBlur(text);
  }, [onBlur, text]);

  const onIconPressInternal = useCallback(
    (icon: TextInputIcon) => () => {
      icon.onPress(text);
      if (icon.clear) setText('');
      if (icon.reset) setText(value);
    },
    [text, value],
  );

  const onInternalRef = useCallback(
    (ref: TextInputRef) => {
      if (!ref) return;
      textInput.current = ref;
      if (onRef) onRef.current = ref;
    },
    [onRef],
  );

  const handleTitlePress = useCallback(() => {
    textInput.current?.focus();
  }, []);

  const handleLayout = useCallback(() => {
    if (!focusOnLoad) return;
    textInput.current?.focus();
  }, [focusOnLoad]);

  useEffect(() => {
    setText(value);
  }, [value]);

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
          borderBottomColor: error
            ? colors.text.negative
            : focus
            ? colors.text.accent
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
          secureTextEntry={secureTextEntry}
          selectionColor={colors.text.accent}
          style={{
            color: textColor,
            flex: 1,
            padding: spacing(2),
            ...fontSize,
          }}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={text}
        />
        {icons.length > 0 && ( // TODO: refactor to declarative
          <View
            alignSelf="flex-end"
            flexDirection="row"
          >
            {icons.map((icon) =>
              icon.hidden ||
              (focus && !icon.focus) ||
              (!focus && icon.focus) ? null : (
                <Pressable
                  disabled={
                    icon.required ? text.trim().length === 0 : undefined
                  }
                  key={`${icon.name}-focus`}
                  onPress={onIconPressInternal(icon)}
                >
                  <Icon
                    color={icon.color}
                    disabled={
                      icon.required ? text.trim().length === 0 : undefined
                    }
                    name={icon.name}
                    padded
                    size={iconHeight}
                  />
                </Pressable>
              ),
            )}
          </View>
        )}
      </View>
    </View>
  );
});
