import React, {memo, MutableRefObject, useCallback, useState} from 'react';
import {TextInput as Original, View} from 'react-native';
import {Icon, TextInput} from '../../../components';
import {useColor} from '../../../hooks';

type Icon = {
  name: string;
  onPress: (text: string) => void;
  hidden?: boolean;
  color?: string;
  focus?: boolean;
};

type TextInputWithIconsProps = {
  value: string;
  onRef: MutableRefObject<Original | null>;
  icons: Icon[];
};

const TextInputIsolated = memo(function TextInputIsolated({
  onBlur,
  onFocus,
  onSubmit,
  placeholder,
  value,
  onRef,
}: TextInputIsolatedProps) {
  const color = useColor();
  const [text, setText] = useState(value);

  const onTextChange = useCallback((change) => {
    setText(change);
  }, []);

  const onFocusInternal = useCallback(() => {
    onFocus();
  }, [onFocus]);

  const onSubmitInternal = useCallback(() => {
    onSubmit(text);
  }, [onSubmit, text]);

  const onBlurInternal = useCallback(() => {
    setText(value);
    onBlur();
  }, [onBlur, value]);

  return (
    <TextInput
      backgroundColor={color.surface}
      flex
      onBlur={onBlurInternal}
      onChangeText={onTextChange}
      onFocus={onFocusInternal}
      onRef={onRef}
      onSubmitEditing={onSubmitInternal}
      placeholder={placeholder}
      pointerEvents="none"
      returnKeyType="done"
      value={text}
    />
  );
});

type Icon = {
  name: string;
  handlePress: () => void;
  hidden?: boolean;
};

type Icons = {
  focus: Icon[];
  blur: Icon[];
};

type TextInputWithIconsProps = {
  value: string;
  placeholder: string;
  icons: Icons;
  onRef: MutableRefObject<Original | null>;
  onSubmit: (text: string) => void;
};

export const TextInputWithIcons = memo(function TextInputWithIcons({
  value,
  placeholder,
  icons,
  onSubmit,
  onRef,
}: TextInputWithIconsProps) {
  const [showControls, setShowControls] = useState(false);

  const onFocus = useCallback(() => setShowControls(true), []);
  const onBlur = useCallback(() => setShowControls(false), []);
  const onIconPressInternal = useCallback((c) => () => c(text), [text]);

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInputIsolated
        onBlur={onBlur}
        onFocus={onFocus}
        onRef={onRef}
        onSubmit={onSubmit}
        placeholder={placeholder}
        value={value}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icons.map((icon) =>
          icon.hidden ||
          (showControls && !icon.focus) ||
          (!showControls && icon.focus) ? null : (
            <Icon
              color={icon.color}
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
