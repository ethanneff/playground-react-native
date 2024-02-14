import React, { useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import { TextInput, View, type TextInputIcon } from '../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
} from '../../../conversions';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { navItemDetails, updateItem } from '../models';
import { type MainStackRoutes } from '../navigationTypes';

type ListHeaderProperties = {
  readonly itemId: string;
  readonly parentItemId: string | null;
};

export const ListHeader = ({ itemId, parentItemId }: ListHeaderProperties) => {
  const dispatch = useAppDispatch();
  const { navigate } =
    useNavigation<StackNavigationProperty<MainStackRoutes>>();
  const item = useAppSelector((s) => s.complete.item.items[itemId]);
  const form = useRef('');

  const onSave = useCallback(() => {
    dispatch(updateItem({ ...item, title: form.current }));
    Keyboard.dismiss();
  }, [dispatch, item]);

  const handleChange = useCallback((title: string) => {
    form.current = title;
  }, []);

  const onDetail = useCallback(() => {
    dispatch(navItemDetails({ itemId, parentItemId }));
    navigate('item-detail');
  }, [dispatch, itemId, navigate, parentItemId]);

  const onClose = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const icons: TextInputIcon[] = [
    { focus: true, name: 'close', onPress: onClose, reset: true },
    {
      color: 'accent',
      focus: true,
      name: 'send',
      onPress: onSave,
      required: true,
    },
    { name: 'dots-horizontal', onPress: onDetail },
  ];

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TextInput
        autoCapitalize="sentences"
        autoComplete="off"
        autoCorrect
        blurOnSubmit
        editable={item.editable}
        icons={icons}
        keyboardType="default"
        onChangeText={handleChange}
        onSubmitEditing={onSave}
        placeholder="List title..."
        returnKeyType="done"
        textContentType="none"
        type="h4"
        value={item.title}
      />
    </View>
  );
};
