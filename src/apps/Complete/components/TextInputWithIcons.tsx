import React, {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {TextInput as Original, View} from 'react-native';
import {Icon, TextInput} from '../../../components';
import {PointerEvents} from '../../../components/TextInput/types';
import {TouchableWithoutFeedback} from '../../../conversions';
import {useColor} from '../../../hooks';
import {config, FontType} from '../../../utils';

type Icon = {
  name: string;
  onPress: (text: string) => void;
  hidden?: boolean;
  color?: string;
  focus?: boolean;
  required?: boolean;
};

type TextInputWithIconsProps = {
  value: string;
  placeholder: string;
  icons: Icon[];
  onRef?: MutableRefObject<Original | null>;
  onSubmit: (text: string) => void;
  backgroundColor?: string;
  pointerEvents?: PointerEvents;
  type?: FontType;
  onBlur?: () => void;
  onFocus?: () => void;
  blurOnSubmit?: boolean;
  multiline?: boolean;
  iconHeight?: number;
  editable?: boolean;
  numberOfLines?: number;
};

export const TextInputWithIcons = memo(function TextInputWithIcons({
  value,
  multiline,
  iconHeight = config.padding(6),
  placeholder,
  backgroundColor,
  editable,
  pointerEvents,
  icons,
  type,
  onSubmit,
  blurOnSubmit,
  onFocus,
  numberOfLines,
  onBlur,
  onRef,
}: TextInputWithIconsProps) {
  const color = useColor();
  const bgColor = backgroundColor || color.background;
  const [text, setText] = useState(value);
  const [showControls, setShowControls] = useState(false);

  const onTextChange = useCallback((change) => {
    setText(change);
  }, []);

  const onFocusInternal = useCallback(() => {
    setShowControls(true);
    if (onFocus) onFocus();
  }, [onFocus]);

  const onSubmitInternal = useCallback(() => {
    const result = text.trim();
    onSubmit(result);
    if (value === '') setText('');
  }, [onSubmit, text, value]);

  const onBlurInternal = useCallback(() => {
    setText(value);
    setShowControls(false);
    if (onBlur) onBlur();
  }, [onBlur, value]);

  const onIconPressInternal = useCallback(
    (callback) => () => {
      callback(text);
      if (value === '') setText('');
    },
    [text, value],
  );

  const onIconParentPress = useCallback((e) => e.preventDefault(), []);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        backgroundColor={bgColor}
        blurOnSubmit={blurOnSubmit}
        editable={editable}
        flex
        multiline={multiline}
        numberOfLines={numberOfLines}
        onBlur={onBlurInternal}
        onChangeText={onTextChange}
        onFocus={onFocusInternal}
        onRef={onRef}
        onSubmitEditing={onSubmitInternal}
        placeholder={placeholder}
        pointerEvents={pointerEvents}
        returnKeyType="done"
        type={type}
        value={text}
      />
      <TouchableWithoutFeedback
        onPress={onIconParentPress}
        style={{flexDirection: 'row'}}>
        {icons.map((icon) =>
          icon.hidden ||
          (showControls && !icon.focus) ||
          (!showControls && icon.focus) ? null : (
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
    </View>
  );
});
