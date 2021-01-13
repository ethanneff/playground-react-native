import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput, View} from 'react-native';
import {Button} from '../../../components';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';
import {completeConfig} from '../utils';
import {TextInputWithIcons} from './TextInputWithIcons';

type AddButtonProps = {
  width?: number;
  placeholder: string;
  title: string;
  onSubmit: (value: string) => void;
  noSubmitFocus?: boolean;
};

export const AddButton = memo(function AddButton({
  width,
  placeholder,
  title,
  noSubmitFocus,
  onSubmit,
}: AddButtonProps) {
  const color = useColor();
  const textInputRef = useRef<OriginalTextInput | null>(null);
  const [showInput, setShowInput] = useState(false);
  const onAddItemPress = useCallback(() => {
    setShowInput((p) => !p);
  }, []);

  const onItemTitleClose = useCallback(() => {
    setShowInput(false);
  }, []);

  const onItemTitleSubmit = useCallback(
    (text) => {
      onSubmit(text);
      if (noSubmitFocus) textInputRef.current?.blur();
    },
    [noSubmitFocus, onSubmit],
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

  useEffect(() => {
    if (showInput) textInputRef.current?.focus();
  }, [showInput]);

  return (
    <View
      style={{
        width,
        height: config.padding(12),
        borderRadius: completeConfig.borderRadius,
        backgroundColor: color.background,
        justifyContent: 'center',
      }}>
      {showInput ? (
        <TextInputWithIcons
          blurOnSubmit={false}
          icons={icons}
          onBlur={onBlur}
          onRef={textInputRef}
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
