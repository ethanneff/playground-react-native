import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Button, Icon, Screen} from '../../../../components';
import {useColor, useNav} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {getActiveChecklistOrderByCreatedAt, setActiveList} from '../../models';
import {navigate} from '../../../../models';

export default memo(function Checklists() {
  const nav = useNav();
  const color = useColor();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getActiveChecklistOrderByCreatedAt);

  const handleItemPress = useCallback(
    (id: string) => () => {
      dispatch(setActiveList(id));
      dispatch(navigate('checklistsList'));
    },
    [dispatch],
  );

  const handleItemLongPress = useCallback(
    (id: string) => () => {
      dispatch(setActiveList(id));
      dispatch(navigate('checklistsListUpdate'));
    },
    [dispatch],
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

  const keyExtractor = useCallback((item) => item.id, []);
  const navBack = useCallback(nav('portfolioLanding'), [nav]);
  const navCreate = useCallback(nav('playground'), [nav]);

  return (
    <Screen gutter onLeftPress={navBack} title="Checklists">
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
