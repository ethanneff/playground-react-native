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
};

export const TextInputWithIcons = memo(function TextInputWithIcons({
  value,
  placeholder,
  backgroundColor,
  pointerEvents,
  icons,
  type,
  onSubmit,
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
  }, []);

  const onSubmitInternal = useCallback(() => {
    onSubmit(text);
  }, [onSubmit, text]);

  const onBlurInternal = useCallback(() => {
    setText(value);
    setShowControls(false);
  }, [value]);

  const onIconPressInternal = useCallback((c) => () => c(text), [text]);

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput
        backgroundColor={bgColor}
        flex
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
