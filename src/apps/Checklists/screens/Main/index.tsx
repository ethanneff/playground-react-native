import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { type ListRenderItem } from 'react-native';
import {
  Button,
  FlatList,
  Icon,
  Screen,
  TouchableOpacity,
} from '../../../../components';
import { useRootDispatch, useRootSelector } from '../../../../redux';

import {
  getActiveChecklistOrderByCreatedAt,
  setActiveList,
  type Checklist,
} from '../../models';

export default memo(function Checklists() {
  const { navigate } = useNavigation();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getActiveChecklistOrderByCreatedAt);

  const handleItemPress = useCallback(
    (id: string) => () => {
      dispatch(setActiveList(id));
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
      navigate('checklistsList');
    },
    [dispatch, navigate],
  );

  const handleItemLongPress = useCallback(
    (id: string) => () => {
      dispatch(setActiveList(id));
    },
    [dispatch],
  );

  const renderItem = useCallback<ListRenderItem<Checklist>>(
    ({ item }) => (
      <Button
        onLongPress={handleItemLongPress(item.id)}
        onPress={handleItemPress(item.id)}
        title={item.name}
      />
    ),
    [handleItemLongPress, handleItemPress],
  );

  const keyExtractor = useCallback((item: Checklist) => item.id, []);
  const navBack = useCallback(() => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('portfolioLanding');
  }, [navigate]);
  const navCreate = useCallback(() => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('playground');
  }, [navigate]);

  return (
    <Screen
      onLeftPress={navBack}
      title="Checklists"
    >
      <FlatList
        data={items}
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
