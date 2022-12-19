import React, {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { GestureTextInput } from '../../conversions';
import {
  FontEmphasis,
  FontType,
  getFontStyles,
  MonoMultiColor,
  spacing,
  useColors,
} from '../../features';
import { Icon, IconName } from '../Icon';
import { Spacing } from '../Spacing';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';
import { View } from '../View';
import { PointerEvents, TextContentType } from './types';

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
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'gender'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'username'
  | 'username-new'
  | 'off';

export type TextInputRef = GestureTextInput | null;

type TextInputProps = {
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
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
  value = '',
  multiline,
  autoCorrect,
  autoCapitalize,
  emphasis,
  disableFullscreenUI,
  iconHeight = spacing(5),
  placeholder,
  submitClear,
  onChangeText,
  backgroundColor,
  editable,
  pointerEvents,
  icons = [],
  focusOnLoad,
  type,
  onSubmitEditing,
  blurOnSubmit,
  onFocus,
  numberOfLines,
  autoComplete,
  onBlur,
  title,
  error,
  style,
  onRef,
  returnKeyType,
  keyboardType,
  secureTextEntry,
  textContentType = 'none',
  color,
}: TextInputProps) {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(value);
  const colors = useColors();
  const backColor = colors.background[backgroundColor ?? 'primaryA'];
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
    <View style={[{ flex: 1 }, style]}>
      {title ? (
        <>
          <Text
            onPress={handleTitlePress}
            title={title}
          />
          <Spacing padding={1} />
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
                <TouchableOpacity
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
                </TouchableOpacity>
              ),
            )}
          </View>
        )}
      </View>
    </View>
  );
});
