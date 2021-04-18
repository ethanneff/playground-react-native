import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Button, Icon, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {getActiveChecklistOrderByCreatedAt, setActiveList} from '../../models';

export default memo(function Checklists() {
  const {navigate} = useNavigation();
  const color = useColor();
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
      navigate('checklistsListUpdate');
    },
    [dispatch, navigate],
  );

  const renderItem = useCallback(
    ({item}) => (
      <Button
        onLongPress={handleItemLongPress(item.id)}
        onPress={handleItemPress(item.id)}
        title={item.name}
      />
    ),
    [handleItemLongPress, handleItemPress],
  );

  const keyExtractor = useCallback(item => item.id, []);
  const navBack = useCallback(() => navigate('portfolioLanding'), [navigate]);
  const navCreate = useCallback(() => navigate('playground'), [navigate]);

  return (
    <Screen onLeftPress={navBack} title="Checklists">
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
