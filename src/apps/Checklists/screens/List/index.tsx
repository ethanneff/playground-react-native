import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import {
  Button,
  FlatList,
  FlatListRenderItem,
  Icon,
  Screen,
  TouchableOpacity,
  View,
} from '../../../../components';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { SuperAny } from '../../../../types/types';
import {
  ChecklistItem,
  getCurrentActiveChecklistItemsOrderByCreatedAt,
  removeChecklistItem,
  setActiveChecklistItem,
  toggleChecklistItemComplete,
} from '../../models';

export default memo(function Checklist() {
  const { navigate } = useNavigation<SuperAny>();
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
      navigate('checklistsItemUpdate');
    },
    [dispatch, navigate],
  );

  const renderItem = useCallback<FlatListRenderItem<ChecklistItem>>(
    ({ item }) => (
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Icon
          color="positive"
          name="checkbox-marked-circle"
        />
        <TouchableOpacity onPress={handleRemove(item.id)}>
          <Icon
            color="negative"
            name="close-circle"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggle(item.id)}>
          <Icon
            color="warning"
            name="clock"
          />
        </TouchableOpacity>
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
  const navBack = useCallback(() => navigate('checklists'), [navigate]);
  const navCreate = useCallback(
    () => navigate('checklistsItemCreate'),
    [navigate],
  );

  return (
    <Screen
      onLeftPress={navBack}
      title="Checklist"
    >
      <FlatList
        data={items}
        estimatedItemSize={0}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={navCreate}>
        <Icon
          color="primaryA"
          fab
          name="plus"
          right
        />
      </TouchableOpacity>
    </Screen>
  );
});
