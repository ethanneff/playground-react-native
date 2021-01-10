import React, {memo, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {Card} from '../../../components';
import {useColor} from '../../../hooks';
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
    <Card>
      <TextInputWithIcons
        icons={icons('title')}
        onSubmit={onSubmit('title')}
        placeholder={`${placeholder} title...`}
        type="h4"
        value={title}
      />
      <TextInputWithIcons
        icons={icons('description')}
        multiline
        notRequired
        onSubmit={onSubmit('description')}
        placeholder={`${placeholder} details...`}
        value={description || ''}
      />
    </Card>
  );
});
