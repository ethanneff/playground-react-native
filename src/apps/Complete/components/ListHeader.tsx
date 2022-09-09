import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import { TextInput, TextInputIcon, View } from '../../../components';
import { useRootDispatch, useRootSelector } from '../../../redux';
import { navItemDetails, updateItem } from '../models';
import { MainStackRoutes } from '../navigationTypes';

type ListHeaderProps = {
  itemId: string;
  parentItemId: string | null;
};

export const ListHeader = memo(function ListHeader({
  itemId,
  parentItemId,
}: ListHeaderProps) {
  const dispatch = useRootDispatch();
  const { navigate } = useNavigation<StackNavigationProp<MainStackRoutes>>();
  const item = useRootSelector((s) => s.completeItem.items[itemId]);
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

  const onClose = useCallback(() => Keyboard.dismiss(), []);

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
});
