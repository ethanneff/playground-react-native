import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef} from 'react';
import {Keyboard, TextInput as OriginalTextInput} from 'react-native';
import {TextInput, TextInputIcon} from '../../../components';
import {TouchableWithoutFeedback} from '../../../conversions';
import {useColor} from '../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {
  navItemDetails,
  navItemProject,
  swapItemOrderInItem,
  updateItem,
} from '../models';
import {ImplementTabNavigation} from '../navigationTypes';
import {completeConfig} from '../utils';

type ListItemProps = {
  index: number;
  itemId: string;
  parentItemId: string;
};

export const ListItem = memo(function ListItem({
  index,
  itemId,
  parentItemId,
}: ListItemProps) {
  const item = useRootSelector(s => s.completeItem.items[itemId]);
  const parentChildrenCount = useRootSelector(
    s => s.completeItem.items[parentItemId].children.length,
  );
  const textInputRef = useRef<OriginalTextInput | null>(null);
  const dispatch = useRootDispatch();
  const {navigate} = useNavigation<ImplementTabNavigation>();
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
    dispatch(navItemProject({projectItemId: itemId}));
    navigate('project');
  }, [dispatch, itemId, navigate]);

  const onItemDetails = useCallback(() => {
    dispatch(navItemDetails({parentItemId, itemId}));
    navigate('item-detail');
  }, [dispatch, itemId, navigate, parentItemId]);

  const onItemLongPress = useCallback(() => undefined, []);

  const onItemPress = useCallback(() => {
    textInputRef.current?.focus();
  }, []);

  const onItemUp = useCallback(() => {
    if (index === 0) return;
    dispatch(swapItemOrderInItem({parentItemId, i: index, j: index - 1}));
  }, [dispatch, index, parentItemId]);

  const onItemDown = useCallback(() => {
    if (index >= parentChildrenCount - 1) return;
    dispatch(swapItemOrderInItem({parentItemId, i: index, j: index + 1}));
  }, [dispatch, index, parentChildrenCount, parentItemId]);

  const icons: TextInputIcon[] = [
    {name: 'close', onPress: onItemTitleClose, focus: true, reset: true},
    {
      name: 'send',
      onPress: onItemTitleSubmit,
      color: 'accent',
      focus: true,
      required: true,
    },
    {name: 'chevron-up', onPress: onItemUp, hidden: true},
    {name: 'chevron-down', onPress: onItemDown, hidden: true},
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
        backgroundColor: color.background.secondary,
        flexDirection: 'row',
      }}>
      <TextInput
        backgroundColor="secondary"
        icons={icons}
        onRef={textInputRef}
        onSubmitEditing={onItemTitleSubmit}
        placeholder="Item name..."
        pointerEvents="none"
        returnKeyType="done"
        value={item.title}
      />
    </TouchableWithoutFeedback>
  );
});
