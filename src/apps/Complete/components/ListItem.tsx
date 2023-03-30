import React, { memo, useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import {
  TextInput,
  TouchableWithoutFeedback,
  type TextInputIcon,
  type TextInputRef,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { useColors } from '../../../features';
import { useRootDispatch, useRootSelector } from '../../../redux';
import {
  navItemDetails,
  navItemProject,
  swapItemOrderInItem,
  updateItem,
} from '../models';
import { type ImplementTabNavigation } from '../navigationTypes';
import { completeConfig } from '../utils';

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
  const item = useRootSelector((s) => s.completeItem.items[itemId]);
  const parentChildrenCount = useRootSelector(
    (s) => s.completeItem.items[parentItemId].children.length,
  );
  const textInputRef = useRef<TextInputRef>(null);
  const dispatch = useRootDispatch();
  const { navigate } = useNavigation<ImplementTabNavigation>();
  const colors = useColors();
  const form = useRef('');

  const onItemTitleClose = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onItemTitleSubmit = useCallback(() => {
    dispatch(updateItem({ ...item, title: form.current }));
    Keyboard.dismiss();
  }, [dispatch, item]);

  const onItemNav = useCallback(() => {
    dispatch(navItemProject({ projectItemId: itemId }));
    navigate('project');
  }, [dispatch, itemId, navigate]);

  const onItemDetails = useCallback(() => {
    dispatch(navItemDetails({ itemId, parentItemId }));
    navigate('item-detail');
  }, [dispatch, itemId, navigate, parentItemId]);

  const onItemLongPress = useCallback(() => undefined, []);

  const onItemPress = useCallback(() => {
    textInputRef.current?.focus();
  }, []);

  const onItemUp = useCallback(() => {
    if (index === 0) return;
    dispatch(swapItemOrderInItem({ i: index, j: index - 1, parentItemId }));
  }, [dispatch, index, parentItemId]);

  const onItemDown = useCallback(() => {
    if (index >= parentChildrenCount - 1) return;
    dispatch(swapItemOrderInItem({ i: index, j: index + 1, parentItemId }));
  }, [dispatch, index, parentChildrenCount, parentItemId]);

  const icons: TextInputIcon[] = [
    { focus: true, name: 'close', onPress: onItemTitleClose, reset: true },
    {
      color: 'accent',
      focus: true,
      name: 'send',
      onPress: onItemTitleSubmit,
      required: true,
    },
    { hidden: true, name: 'chevron-up', onPress: onItemUp },
    { hidden: true, name: 'chevron-down', onPress: onItemDown },
    { name: 'dots-horizontal', onPress: onItemDetails },
    {
      hidden: !item.children.length,
      name: 'chevron-right',
      onPress: onItemNav,
    },
  ];

  const handleChange = useCallback((value: string) => {
    form.current = value;
  }, []);

  return (
    <TouchableWithoutFeedback
      key={item.id}
      onLongPress={onItemLongPress}
      onPress={onItemPress}
      style={{
        backgroundColor: colors.background.secondary,
        borderRadius: completeConfig.borderRadius,
        flex: 1,
        flexDirection: 'row',
        margin: completeConfig.padding / 2,
      }}
    >
      <TextInput
        autoCapitalize="sentences"
        autoComplete="off"
        autoCorrect
        backgroundColor="secondary"
        blurOnSubmit
        editable
        icons={icons}
        keyboardType="default"
        onChangeText={handleChange}
        onRef={textInputRef}
        onSubmitEditing={onItemTitleSubmit}
        placeholder="Item name..."
        pointerEvents="none"
        returnKeyType="done"
        textContentType="none"
        value={item.title}
      />
    </TouchableWithoutFeedback>
  );
});
