import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {Card} from './Card';
import {ItemDetailHeader} from './ItemDetailHeader';

type OnSubmit = (text: string) => void;

type ItemEditProps = {
  title: string;
  titleEditable: boolean;
  description?: string;
  placeholder: string;
  onSubmit: (type: string) => OnSubmit;
};

export const ItemEdit = memo(function ItemEdit({
  title,
  titleEditable,
  description = '',
  placeholder,
  onSubmit,
}: ItemEditProps) {
  const color = useColor();
  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons = useCallback(
    (type: string) => [
      {name: 'close', onPress: onClose, focus: true, reset: true},
      {
        name: 'send',
        onPress: onSubmit(type),
        color: color.primary,
        focus: true,
        required: true,
      },
    ],
    [color.primary, onClose, onSubmit],
  );
  // TODO: need to clear on blur

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
