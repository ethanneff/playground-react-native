import React, {memo, MutableRefObject, useCallback, useState} from 'react';
import {TextInput as Original, View} from 'react-native';
import {Icon, TextInput} from '../../../components';
import {PointerEvents} from '../../../components/TextInput/types';
import {useColor} from '../../../hooks';
import {FontType} from '../../../utils';

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
  focusOnLoad?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  blurOnSubmit?: boolean;
  multiline?: boolean;
};

export const TextInputWithIcons = memo(function TextInputWithIcons({
  value,
  placeholder,
  backgroundColor,
  pointerEvents,
  focusOnLoad,
  icons,
  type,
  onSubmit,
  blurOnSubmit,
  onFocus,
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
    if (text.trim().length === 0) return;
    onSubmit(text);
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

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput
        backgroundColor={bgColor}
        blurOnSubmit={blurOnSubmit}
        flex
        focusOnLoad={focusOnLoad}
        multiline={multiline}
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            />
          ),
        )}
      </View>
    </View>
  );
});
