import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {useColor} from '../../../hooks';
import {Card} from './Card';
import {ItemDetailHeader} from './ItemDetailHeader';
import {TextInputWithIcons} from './TextInputWithIcons';

type ItemEditProps = {
  title: string;
  description?: string;
  placeholder: string;
  onSubmit: (type: string) => (text: string) => void;
};

export const ItemEdit = memo(function ItemEdit({
  title,
  description = '',
  placeholder,
  onSubmit,
}: ItemEditProps) {
  const color = useColor();
  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons = useCallback(
    (type: string) => [
      {name: 'close', onPress: onClose, focus: true},
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
        <TextInputWithIcons
          icons={icons('title')}
          onSubmit={onSubmit('title')}
          placeholder={`${placeholder} title...`}
          type="h4"
          value={title}
        />
        <ItemDetailHeader title="Details" />
        <TextInputWithIcons
          icons={icons('description')}
          multiline
          notRequired
          onSubmit={onSubmit('description')}
          placeholder={`${placeholder} details...`}
          value={description || ''}
        />
      </Card>
    </View>
  );
});
