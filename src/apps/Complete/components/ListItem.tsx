import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef} from 'react';
import {
  Keyboard,
  TextInput as OriginalTextInput,
  TouchableOpacity,
} from 'react-native';
import {useColor} from '../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {config} from '../configs';
import {
  setActiveBoard,
  setActiveItem,
  setActiveList,
  updateItem,
} from '../models';
import {TextInputWithIcons} from './TextInputWithIcons';

type ListItemProps = {
  itemId: string;
  listId: string;
};

export const ListItem = memo(function ListItem({
  itemId,
  listId,
}: ListItemProps) {
  const item = useRootSelector((s) => s.completeItem.items[itemId]);
  const textInputRef = useRef<OriginalTextInput | null>(null);
  const dispatch = useRootDispatch();
  const {navigate} = useNavigation();
  const color = useColor();

  const onItemTitleClose = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onItemTitleSubmit = useCallback(
    (title: string) => {
      dispatch(updateItem({...item, title}));
      Keyboard.dismiss();
    },
    [dispatch, item],
  );

  const onItemNav = useCallback(() => {
    if (!item.board)
      throw new Error('item does not have a board to navigate to');
    dispatch(setActiveBoard(item.board));
    navigate('board');
  }, [dispatch, item.board, navigate]);

  const onItemDetails = useCallback(() => {
    dispatch(setActiveItem(itemId));
    dispatch(setActiveList(listId));
    navigate('item-detail');
  }, [dispatch, itemId, listId, navigate]);

  const onItemLongPress = useCallback(() => {
    console.log('long press');
  }, []);

  const onItemPress = useCallback(() => {
    textInputRef.current?.focus();
  }, []);

  const icons = [
    {name: 'close', onPress: onItemTitleClose, focus: true},
    {
      name: 'send',
      onPress: onItemTitleSubmit,
      color: color.primary,
      focus: true,
    },
    {name: 'dots-horizontal', onPress: onItemDetails},
    {name: 'chevron-right', onPress: onItemNav, hidden: !item.board},
  ];

  return (
    <TouchableOpacity
      activeOpacity={1}
      key={item.id}
      onLongPress={onItemLongPress}
      onPress={onItemPress}
      style={{
        flex: 1,
        borderRadius: config.borderRadius,
        margin: config.padding / 2,
        backgroundColor: color.surface,
        flexDirection: 'row',
      }}>
      <TextInputWithIcons
        backgroundColor={color.surface}
        icons={icons}
        onRef={textInputRef}
        onSubmit={onItemTitleSubmit}
        placeholder="Item name..."
        pointerEvents="none"
        value={item.title}
      />
    </TouchableOpacity>
  );
});
