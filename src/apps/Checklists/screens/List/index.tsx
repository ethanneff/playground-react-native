import React, { memo, useCallback } from 'react';
import {
  Button,
  FlashList,
  Icon,
  Screen,
  Pressable,
  View,
  type FlashListRenderItem,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import {
  getCurrentActiveChecklistItemsOrderByCreatedAt,
  removeChecklistItem,
  setActiveChecklistItem,
  toggleChecklistItemComplete,
  type ChecklistItem,
} from '../../models';

export default memo(function Checklist() {
  const { navigate } = useNavigation();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getCurrentActiveChecklistItemsOrderByCreatedAt);

  const handleRemove = useCallback(
    (id: string) => () => dispatch(removeChecklistItem(id)),
    [dispatch],
  );
  const handleToggle = useCallback(
    (id: string) => () => dispatch(toggleChecklistItemComplete(id)),
    [dispatch],
  );
  const handleEdit = useCallback(
    (id: string) => () => {
      dispatch(setActiveChecklistItem(id));
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
      navigate('checklistsItemUpdate');
    },
    [dispatch, navigate],
  );

  const renderItem = useCallback<FlashListRenderItem<ChecklistItem>>(
    ({ item }) => (
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Icon
          color="positive"
          name="checkbox-marked-circle"
        />
        <Pressable onPress={handleRemove(item.id)}>
          <Icon
            color="negative"
            name="close-circle"
          />
        </Pressable>
        <Pressable onPress={handleToggle(item.id)}>
          <Icon
            color="warning"
            name="clock"
          />
        </Pressable>
        <Button
          color={item.completed ? 'accent' : 'primaryA'}
          lowercase
          onPress={handleEdit(item.id)}
          title={item.name}
        />
      </View>
    ),
    [handleEdit, handleRemove, handleToggle],
  );
  const keyExtractor = useCallback((item: ChecklistItem) => item.id, []);
  const navBack = useCallback(() => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('checklists');
  }, [navigate]);
  const navCreate = useCallback(() => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('checklistsItemCreate');
  }, [navigate]);

  return (
    <Screen
      onLeftPress={navBack}
      title="Checklist"
    >
      <FlashList
        data={items}
        estimatedItemSize={0}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Pressable onPress={navCreate}>
        <Icon
          color="primaryA"
          fab
          name="plus"
          right
        />
      </Pressable>
    </Screen>
  );
});
