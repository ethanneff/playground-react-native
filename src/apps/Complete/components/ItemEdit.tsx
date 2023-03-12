import React, { memo, useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import { Card, TextInput, TextInputIcon, View } from '../../../components';
import { ItemDetailHeader } from './ItemDetailHeader';

type OnSubmit = (text: string) => void;

type ItemEditProps = {
  description?: string;
  onSubmit: (type: string) => OnSubmit;
  placeholder: string;
  title: string;
  titleEditable: boolean;
};

type Form = {
  description: string;
  title: string;
};

// TODO: need to clear on blur
export const ItemEdit = memo(function ItemEdit({
  description = '',
  onSubmit,
  placeholder,
  title,
  titleEditable,
}: ItemEditProps) {
  const onClose = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  const form = useRef({ description, title });

  const handleChangeText = useCallback(
    (key: keyof Form) => (value: string) => {
      form.current[key] = value;
    },
    [],
  );

  const handleSubmit = useCallback(
    (key: keyof Form) => () => {
      onSubmit(key);
    },
    [onSubmit],
  );

  const icons = useCallback(
    (type: string): TextInputIcon[] => [
      { focus: true, name: 'close', onPress: onClose, reset: true },
      {
        color: 'accent',
        focus: true,
        name: 'send',
        onPress: onSubmit(type),
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
          autoCapitalize="sentences"
          autoComplete="off"
          autoCorrect
          blurOnSubmit
          editable={titleEditable}
          icons={icons('title')}
          keyboardType="default"
          onChangeText={handleChangeText('title')}
          onSubmitEditing={handleSubmit('title')}
          placeholder={`${placeholder} title...`}
          returnKeyType="done"
          textContentType="none"
          value={title}
        />
        <ItemDetailHeader title="Details" />
        <TextInput
          autoCapitalize="sentences"
          autoComplete="off"
          autoCorrect
          blurOnSubmit={false}
          editable
          icons={icons('description')}
          keyboardType="default"
          multiline
          onChangeText={handleChangeText('description')}
          onSubmitEditing={handleSubmit('description')}
          placeholder={`${placeholder} details...`}
          returnKeyType="default"
          textContentType="none"
          value={description || ''}
        />
      </Card>
    </View>
  );
});
