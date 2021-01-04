import React, {memo, useCallback, useRef, useState} from 'react';
import {TextInput as OriginalTextInput, View} from 'react-native';
import {Button} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme} from '../../../utils';
import {config} from '../configs';
import {TextInputWithIcons} from './TextInputWithIcons';

type AddButtonProps = {
  width?: number;
  placeholder: string;
  title: string;
  onSubmit: (value: string) => void;
};

export const AddButton = memo(function AddButton({
  width,
  placeholder,
  title,
  onSubmit,
}: AddButtonProps) {
  const color = useColor();
  const textInputRef = useRef<OriginalTextInput | null>(null);
  const [showInput, setShowInput] = useState(false);
  const onAddItemPress = useCallback(() => setShowInput((p) => !p), []);

  const onItemTitleClose = useCallback(() => {
    setShowInput(false);
  }, []);

  const onItemTitleSubmit = useCallback(
    (text) => {
      onSubmit(text);
      textInputRef.current?.focus();
    },
    [onSubmit],
  );

  const onBlur = useCallback(() => {
    setShowInput(false);
  }, []);

  const icons = [
    {name: 'close', onPress: onItemTitleClose, focus: true},
    {
      name: 'send',
      onPress: onItemTitleSubmit,
      color: color.primary,
      focus: true,
      required: true,
    },
  ];

  return (
    <View
      style={{
        width,
        height: Theme.padding.p12,
        borderRadius: config.borderRadius,
        backgroundColor: color.background,
        justifyContent: 'center',
      }}>
      {showInput ? (
        <TextInputWithIcons
          blurOnSubmit={false}
          focusOnLoad
          icons={icons}
          onBlur={onBlur}
          onSubmit={onItemTitleSubmit}
          placeholder={placeholder}
          value=""
        />
      ) : (
        <Button center color="primary" onPress={onAddItemPress} title={title} />
      )}
    </View>
  );
});
