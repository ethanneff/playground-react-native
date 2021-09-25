import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback } from 'react';
import { Keyboard, View } from 'react-native';
import { TextInput, TextInputIcon } from '../../../components';
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

  const onSave = useCallback(
    (title) => {
      dispatch(updateItem({ ...item, title }));
      Keyboard.dismiss();
    },
    [dispatch, item],
  );

  const onDetail = useCallback(() => {
    dispatch(navItemDetails({ parentItemId, itemId }));
    navigate('item-detail');
  }, [dispatch, itemId, navigate, parentItemId]);

  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons: TextInputIcon[] = [
    { name: 'close', onPress: onClose, focus: true, reset: true },
    {
      name: 'send',
      onPress: onSave,
      color: 'accent',
      focus: true,
      required: true,
    },
    { name: 'dots-horizontal', onPress: onDetail },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextInput
        editable={item.editable}
        icons={icons}
        onSubmitEditing={onSave}
        placeholder="List title..."
        returnKeyType="done"
        type="h4"
        value={item.title}
      />
    </View>
  );
});
