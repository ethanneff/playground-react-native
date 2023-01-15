import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import {
  Button,
  FlatList,
  FlatListRenderItem,
  Icon,
  Screen,
  TouchableOpacity,
} from '../../../../components';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { SuperAny } from '../../../../types/types';
import {
  Checklist,
  getActiveChecklistOrderByCreatedAt,
  setActiveList,
} from '../../models';

export default memo(function Checklists() {
  const { navigate } = useNavigation<SuperAny>();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getActiveChecklistOrderByCreatedAt);

  const handleItemPress = useCallback(
    (id: string) => () => {
      dispatch(setActiveList(id));
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

  const renderItem = useCallback<FlatListRenderItem<Checklist>>(
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
  const navBack = useCallback(() => navigate('portfolioLanding'), [navigate]);
  const navCreate = useCallback(() => navigate('playground'), [navigate]);

  return (
    <Screen
      onLeftPress={navBack}
      title="Checklists"
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
