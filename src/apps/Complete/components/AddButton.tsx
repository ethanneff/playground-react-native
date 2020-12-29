import React, {memo, useCallback, useRef, useState} from 'react';
import {TextInput as OriginalTextInput, View} from 'react-native';
import {Button, Icon, TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme} from '../../../utils';
import {config} from '../configs';

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
  const [itemTitle, setItemTitle] = useState('');
  const onItemTitleChange = useCallback((v: string) => setItemTitle(v), []);
  const onAddItemPress = useCallback(() => setShowInput((p) => !p), []);

  const onItemTitleClose = useCallback(() => {
    setShowInput(false);
    setItemTitle('');
  }, []);

  const onItemTitleSubmit = useCallback(() => {
    const formatted = itemTitle.trim();
    if (formatted.length === 0) {
      return;
    }
    setItemTitle('');
    onSubmit(formatted);
    textInputRef.current?.focus();
  }, [itemTitle, onSubmit]);

  const onBlur = useCallback(() => {
    setShowInput(false);
    setItemTitle('');
  }, []);

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            blurOnSubmit={false}
            emphasis="high"
            flex
            focusOnLoad
            onBlur={onBlur}
            onChangeText={onItemTitleChange}
            onRef={textInputRef}
            onSubmitEditing={onItemTitleSubmit}
            placeholder={placeholder}
            returnKeyType="done"
            value={itemTitle}
          />
          <Icon name="close" onPress={onItemTitleClose} padded />
          <Icon
            color={color.primary}
            name="send"
            onPress={onItemTitleSubmit}
            padded
          />
        </View>
      ) : (
        <Button center color="primary" onPress={onAddItemPress} title={title} />
      )}
    </View>
  );
});
