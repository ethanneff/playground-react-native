import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {Button, Icon, Screen, TouchableOpacity} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {
  ChecklistItem,
  getCurrentActiveChecklistItemsOrderByCreatedAt,
  removeChecklistItem,
  setActiveChecklistItem,
  toggleChecklistItemComplete,
} from '../../models';

export default memo(function Checklist() {
  const {navigate} = useNavigation();
  const color = useColor();
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

  const renderItem = useCallback<ListRenderItem<ChecklistItem>>(
    ({item}) => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon color={color.text.positive} name="checkbox-marked-circle" />
        <TouchableOpacity onPress={handleRemove(item.id)}>
          <Icon color={color.text.negative} name="close-circle" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggle(item.id)}>
          <Icon color={color.text.warning} name="clock" />
        </TouchableOpacity>
        <Button
          color={item.completed ? 'accent' : 'primaryA'}
          lowercase
          onPress={handleEdit(item.id)}
          title={item.name}
        />
      </View>
    ),
    [
      color.text.negative,
      color.text.positive,
      color.text.warning,
      handleEdit,
      handleRemove,
      handleToggle,
    ],
  );
  const keyExtractor = useCallback(item => item.id, []);
  const navBack = useCallback(() => navigate('checklists'), [navigate]);
  const navCreate = useCallback(
    () => navigate('checklistsItemCreate'),
    [navigate],
  );

  return (
    <Screen onLeftPress={navBack} title="Checklist">
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={navCreate}>
        <Icon color={color.background.primaryA} fab name="plus" right />
      </TouchableOpacity>
    </Screen>
  );
});
