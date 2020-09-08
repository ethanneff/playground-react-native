import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Icon, Screen} from '../../../../components';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {
  getCurrentActiveChecklistItemsOrderByCreatedAt,
  removeChecklistItem,
  setActiveChecklistItem,
  toggleChecklistItemComplete,
} from '../../models';
import {useColor, useNav} from '../../../../hooks';

export default memo(function Checklist() {
  const nav = useNav();
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
      nav('checklistsItemUpdate');
    },
    [dispatch, nav],
  );

  const renderItem = useCallback(
    ({item}) => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon color={color.success} name="checkbox-marked-circle" />
        <Icon
          color={color.danger}
          name="close-circle"
          onPress={handleRemove(item.id)}
        />
        <Icon
          color={color.warning}
          name="clock"
          onPress={handleToggle(item.id)}
        />
        <Button
          color={item.completed ? 'primary' : 'text'}
          lowercase
          onPress={handleEdit(item.id)}
          title={item.name}
        />
      </View>
    ),
    [
      color.danger,
      color.success,
      color.warning,
      handleEdit,
      handleRemove,
      handleToggle,
    ],
  );
  const keyExtractor = useCallback((item) => item.id, []);
  const navBack = useCallback(nav('checklists'), [nav]);
  const navCreate = useCallback(nav('checklistsItemCreate'), [nav]);

  return (
    <Screen gutter onLeftPress={navBack} title="Checklist">
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Icon
        color={color.background}
        fab
        name="plus"
        onPress={navCreate}
        right
      />
    </Screen>
  );
});
