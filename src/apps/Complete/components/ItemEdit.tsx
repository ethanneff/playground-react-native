import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {Card} from './Card';
import {ItemDetailHeader} from './ItemDetailHeader';

type ItemEditProps = {
  title: string;
  titleEditable: boolean;
  description?: string;
  placeholder: string;
  onSubmit: (type: string) => (text: string) => void;
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

  return (
    <View>
      <Card margin="bottom">
        <ItemDetailHeader title="Title" />
        <TextInput
          editable={titleEditable}
          icons={icons('title')}
          onSubmit={onSubmit('title')}
          placeholder={`${placeholder} title...`}
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
