import React, { memo, useCallback } from 'react';
import { Keyboard, View } from 'react-native';
import { TextInput, TextInputIcon } from '../../../components';
import { Card } from './Card';
import { ItemDetailHeader } from './ItemDetailHeader';

type OnSubmit = (text: string) => void;

type ItemEditProps = {
  description?: string;
  onSubmit: (type: string) => OnSubmit;
  placeholder: string;
  title: string;
  titleEditable: boolean;
};

// TODO: need to clear on blur
export const ItemEdit = memo(function ItemEdit({
  title,
  titleEditable,
  description = '',
  placeholder,
  onSubmit,
}: ItemEditProps) {
  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons = useCallback(
    (type: string): TextInputIcon[] => [
      { name: 'close', onPress: onClose, focus: true, reset: true },
      {
        name: 'send',
        onPress: onSubmit(type),
        color: 'accent',
        focus: true,
        required: true,
      },
    ],
    [onClose, onSubmit],
  );

  return (
    <View>
      <Card margin="bottom">
        <ItemDetailHeader title="Title" />
        <TextInput
          editable={titleEditable}
          icons={icons('title')}
          onSubmitEditing={onSubmit('title')}
          placeholder={`${placeholder} title...`}
          returnKeyType="done"
          value={title}
        />
        <ItemDetailHeader title="Details" />
        <TextInput
          icons={icons('description')}
          multiline
          placeholder={`${placeholder} details...`}
          value={description || ''}
        />
      </Card>
    </View>
  );
});
