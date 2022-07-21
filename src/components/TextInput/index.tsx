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
  View,
  ViewStyle,
} from 'react-native';
import { GestureTextInput } from '../../conversions';
import {
  FontEmphasis,
  FontType,
  getFontStyles,
  MonoMultiColor,
  padding,
  SoundManager,
  useColors,
} from '../../features';
import { Icon, IconName } from '../Icon';
import { TouchableOpacity } from '../TouchableOpacity';
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

export type TextInputRef = GestureTextInput | null;

type TextInputProps = {
  autoCorrect?: boolean;
  backgroundColor?: keyof MonoMultiColor;
  blurOnSubmit?: boolean;
  color?: keyof MonoMultiColor;
  disableFullscreenUI?: boolean;
  editable?: boolean;
  emphasis?: FontEmphasis;
  error?: boolean;
  iconHeight?: number;
  icons?: TextInputIcon[];
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: (text: string) => void;
  onChangeText?: (text: string) => void;
  onFocus?: (text: string) => void;
  onRef?: MutableRefObject<TextInputRef>;
  onSubmitEditing?: (text: string) => void;
  placeholder?: string;
  pointerEvents?: PointerEvents;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  submitClear?: boolean;
  textContentType?: TextContentType;
  type?: FontType;
  value?: string;
};

export const TextInput = memo(function TextInput({
  value = '',
  multiline,
  autoCorrect,
  emphasis,
  disableFullscreenUI,
  iconHeight = padding(5),
  placeholder,
  submitClear,
  onChangeText,
  backgroundColor,
  editable,
  pointerEvents,
  icons = [],
  type,
  onSubmitEditing,
  blurOnSubmit,
  onFocus,
  numberOfLines,
  onBlur,
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
  const backColor = colors.background[backgroundColor || 'primaryA'];
  const { fontSize, textColor } = getFontStyles({
    emphasis,
    type,
    color,
    colors,
  });

  const textInput = useRef<TextInputRef>(null);

  const onChangeTextInternal = useCallback(
    (val: string) => {
      setText(val);
      if (onChangeText) onChangeText(val);
    },
    [onChangeText],
  );

  const onSubmitEditingInternal = useCallback(() => {
    if (onSubmitEditing) onSubmitEditing(text);
    if (submitClear) setText('');
  }, [onSubmitEditing, submitClear, text]);

  const onFocusInternal = useCallback(() => {
    SoundManager.play('tap');
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

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <View style={[{ flex: 1 }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backColor,
          borderBottomColor: error
            ? colors.text.negative
            : focus
            ? colors.text.accent
            : backColor,
          borderLeftColor: backColor,
          borderRadius: padding(1),
          borderRightColor: backColor,
          borderTopColor: backColor,
          borderWidth: 2,
        }}
      >
        <GestureTextInput
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
            padding: padding(2),
            ...fontSize,
          }}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={text}
        />
        {icons.length > 0 && ( // TODO: refactor to declarative
          <View style={{ flexDirection: 'row' }}>
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
