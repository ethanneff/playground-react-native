import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Icon, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {
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
  const navBack = useCallback(() => navigate('checklists'), [navigate]);
  const navCreate = useCallback(() => navigate('checklistsItemCreate'), [
    navigate,
  ]);

  return (
    <Screen gutter onLeftPress={navBack} title="Checklist">
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
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
