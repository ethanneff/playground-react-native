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
import {navigate} from '../../../../models';

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
      dispatch(navigate('checklistsItemUpdate'));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item}) => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="checkbox-marked-circle" color={color.success} />
        <Icon
          name="close-circle"
          color={color.danger}
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
          title={item.name}
          onPress={handleEdit(item.id)}
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

  return (
    <Screen onLeftPress={nav.to('checklists')} title="Checklist" gutter>
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderItem}
      />
      <Icon
        fab
        right
        name="plus"
        color={color.background}
        onPress={nav.to('checklistsItemCreate')}
      />
    </Screen>
  );
});
