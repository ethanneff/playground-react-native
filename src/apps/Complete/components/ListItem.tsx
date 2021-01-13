import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef} from 'react';
import {Keyboard, TextInput as OriginalTextInput} from 'react-native';
import {TouchableWithoutFeedback} from '../../../conversions';
import {useColor} from '../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {setNavItemDetail, setNavItemProject, updateItem} from '../models';
import {completeConfig} from '../utils';
import {TextInputWithIcons} from './TextInputWithIcons';

type ListItemProps = {
  itemId: string;
  parentItemId: string;
};

export const ListItem = memo(function ListItem({
  itemId,
  parentItemId,
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
    dispatch(setNavItemProject({projectItemId: itemId}));
    navigate('project');
  }, [dispatch, itemId, navigate]);

  const onItemDetails = useCallback(() => {
    dispatch(setNavItemDetail({parentItemId, itemId}));
    navigate('item-detail');
  }, [dispatch, itemId, navigate, parentItemId]);

  const onItemLongPress = useCallback(() => undefined, []);

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
      required: true,
    },
    {name: 'dots-horizontal', onPress: onItemDetails},
    {
      name: 'chevron-right',
      onPress: onItemNav,
      hidden: !item.children.length,
    },
  ];

  return (
    <TouchableWithoutFeedback
      key={item.id}
      onLongPress={onItemLongPress}
      onPress={onItemPress}
      style={{
        flex: 1,
        borderRadius: completeConfig.borderRadius,
        margin: completeConfig.padding / 2,
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
    </TouchableWithoutFeedback>
  );
});
