import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Button, Screen, Icon} from '../../../../components';
import {useNav, useColor} from '../../../../hooks';
import {useRootSelector, useRootDispatch} from '../../../../utils';
import {setActiveList, getActiveChecklistOrderByCreatedAt} from '../../models';
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
        title={item.name}
        onPress={handleItemPress(item.id)}
        onLongPress={handleItemLongPress(item.id)}
      />
    ),
    [handleItemLongPress, handleItemPress],
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Checklists" gutter>
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderItem}
      />
      <Icon
        fab
        right
        name="plus"
        onPress={nav.to('checklistsListCreate')}
        color={color.background}
      />
    </Screen>
  );
});
