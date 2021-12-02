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
  TextInput as Original,
  View,
  ViewStyle,
} from 'react-native';
import {
  FontEmphasis,
  FontType,
  getFontStyles,
  MonoMultiColor,
  padding,
} from '../../features/Config';
import { useColor } from '../../features/Theme';
import { Icon } from '../Icon';
import { TouchableOpacity } from '../TouchableOpacity';
import { PointerEvents, TextContentType } from './types';

export type TextInputIcon = {
  clear?: boolean;
  color?: keyof MonoMultiColor;
  focus?: boolean;
  hidden?: boolean;
  name: string;
  onPress: (text: string) => void;
  required?: boolean;
  reset?: boolean;
};

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
  onRef?: MutableRefObject<Original | null>;
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
  const colorScheme = useColor();
  const backColor = colorScheme.background[backgroundColor || 'primaryA'];
  const { fontSize, textColor } = getFontStyles({
    emphasis,
    type,
    color,
    colorScheme,
  });

  const textInput = useRef<Original | null>(null);

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
    (ref: Original | null) => {
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
            ? colorScheme.text.negative
            : focus
            ? colorScheme.text.accent
            : backColor,
          borderLeftColor: backColor,
          borderRadius: padding(1),
          borderRightColor: backColor,
          borderTopColor: backColor,
          borderWidth: 2,
        }}
      >
        <Original
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
          placeholderTextColor={colorScheme.text.secondary}
          pointerEvents={pointerEvents}
          ref={onInternalRef}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          selectionColor={colorScheme.text.accent}
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
                  disabled={icon.required && text.trim().length === 0}
                  key={`${icon.name}-focus`}
                  onPress={onIconPressInternal(icon)}
                >
                  <Icon
                    color={icon.color}
                    disabled={icon.required && text.trim().length === 0}
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
