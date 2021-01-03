import React, {memo, MutableRefObject, useCallback, useState} from 'react';
import {TextInput as Original, View} from 'react-native';
import {Icon, TextInput} from '../../../components';
import {useColor} from '../../../hooks';

type TextInputIconsProps = {
  icons: Icon[];
  type: 'focus' | 'blur';
};

const TextInputIcons = memo(function TextInputIcons({
  type,
  icons,
}: TextInputIconsProps) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {icons.map((icon) =>
        icon.hidden ? null : (
          <Icon
            key={`${icon.name}-${type}`}
            name={icon.name}
            onPress={icon.handlePress}
            padded
          />
        ),
      )}
    </View>
  );
});

type TextInputIsolatedProps = {
  onBlur: () => void;
  onFocus: () => void;
  onSubmit: (text: string) => void;
  placeholder: string;
  value: string;
  onRef: MutableRefObject<Original | null>;
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
      {showControls ? (
        <TextInputIcons icons={icons.focus} type="focus" />
      ) : (
        <TextInputIcons icons={icons.blur} type="blur" />
      )}
    </View>
  );
});
