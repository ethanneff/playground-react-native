import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {navItemDetails, updateItem} from '../models';

type ListHeaderProps = {
  itemId: string;
  parentItemId: string | null;
};

export const ListHeader = memo(function ListHeader({
  itemId,
  parentItemId,
}: ListHeaderProps) {
  const dispatch = useRootDispatch();
  const {navigate} = useNavigation();
  const color = useColor();
  const item = useRootSelector((s) => s.completeItem.items[itemId]);

  const onSave = useCallback(
    (title) => {
      dispatch(updateItem({...item, title}));
      Keyboard.dismiss();
    },
    [dispatch, item],
  );

  const onDetail = useCallback(() => {
    dispatch(navItemDetails({parentItemId, itemId}));
    navigate('item-detail');
  }, [dispatch, itemId, navigate, parentItemId]);

  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons = [
    {name: 'close', onPress: onClose, focus: true},
    {
      name: 'send',
      onPress: onSave,
      color: color.primary,
      focus: true,
      required: true,
    },
    {name: 'dots-horizontal', onPress: onDetail},
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextInput
        editable={item.editable}
        icons={icons}
        onSubmit={onSave}
        placeholder="List title..."
        type="h4"
        value={item.title}
      />
    </View>
  );
});
