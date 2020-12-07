import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Button, Screen} from '../../../components';
import {stackParams} from '../navParams';

const screens = Object.keys(stackParams);

export const Landing = memo(function Playground() {
  const {goBack, navigate} = useNavigation();
  const navToItem = useCallback((item: string) => () => navigate(item), [
    navigate,
  ]);
  const renderItem = useCallback(
    ({item}) => <Button key={item} onPress={navToItem(item)} title={item} />,
    [navToItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="Playground">
      <FlatList
        data={screens}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
    </Screen>
  );
});
