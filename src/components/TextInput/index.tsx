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
import {TouchableWithoutFeedback} from '../../conversions';
import {useColor} from '../../hooks';
import {Color} from '../../models';
import {config, FontEmphasis, FontType, getFontStyles} from '../../utils';
import {Icon} from '../Icon';
import {PointerEvents, TextContentType} from './types';

type Icon = {
  name: string;
  onPress: (text: string) => void;
  hidden?: boolean;
  color?: string;
  focus?: boolean;
  required?: boolean;
};

type TextInputProps = {
  type?: FontType;
  emphasis?: FontEmphasis;
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  disableFullscreenUI?: boolean;
  backgroundColor?: string;
  editable?: boolean;
  error?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  textContentType?: TextContentType;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: keyof Color;
  onFocus?: (text: string) => void;
  onBlur?: (text: string) => void;
  pointerEvents?: PointerEvents;
  value: string;
  icons?: Icon[];
  onRef?: MutableRefObject<Original | null>;
  onSubmitEditing?: (text: string) => void;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  iconHeight?: number;
  numberOfLines?: number;
};

export const TextInput = memo(function TextInput({
  value,
  multiline,
  autoCorrect,
  emphasis,
  disableFullscreenUI,
  iconHeight = config.padding(5),
  placeholder,
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
  const backColor = backgroundColor || colorScheme.background;
  const {fontSize, textColor} = getFontStyles({
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
  }, [onSubmitEditing, text]);

  const onFocusInternal = useCallback(() => {
    setFocus(true);
    if (onFocus) onFocus(text);
  }, [onFocus, text]);

  const onBlurInternal = useCallback(() => {
    setFocus(false);
    if (onBlur) onBlur(text);
  }, [onBlur, text]);

  const onIconPressInternal = useCallback((callback) => () => callback(text), [
    text,
  ]);

  const onInternalRef = useCallback(
    (ref: Original | null) => {
      if (!ref) return;
      textInput.current = ref;
      if (onRef) onRef.current = ref;
    },
    [onRef],
  );

  const onIconParentPress = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <View style={[{flex: 1}, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backColor,
          borderBottomColor: error
            ? colorScheme.danger
            : focus
            ? colorScheme.primary
            : backColor,
          borderLeftColor: backColor,
          borderRadius: config.padding(1),
          borderRightColor: backColor,
          borderTopColor: backColor,
          borderWidth: 2,
        }}>
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
          placeholderTextColor={colorScheme.secondary}
          pointerEvents={pointerEvents}
          ref={onInternalRef}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          selectionColor={colorScheme.primary}
          style={{
            color: textColor,
            flex: 1,
            padding: config.padding(2),
            ...fontSize,
          }}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={text}
        />
        {icons.length > 0 && (
          <TouchableWithoutFeedback
            onPress={onIconParentPress}
            style={{flexDirection: 'row'}}>
            {icons.map((icon) =>
              icon.hidden ||
              (focus && !icon.focus) ||
              (!focus && icon.focus) ? null : (
                <Icon
                  color={icon.color}
                  disabled={icon.required && text.trim().length === 0}
                  key={`${icon.name}-focus`}
                  name={icon.name}
                  onPress={onIconPressInternal(icon.onPress)}
                  padded
                  size={iconHeight}
                />
              ),
            )}
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
});
