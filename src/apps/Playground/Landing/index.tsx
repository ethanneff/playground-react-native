import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Button, Screen} from '../../../components';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';
import {PortfolioNavigation, PortfolioRoutes} from '../../Portfolio/types';
import {stackParams} from '../navParams';

const screens = Object.keys(stackParams);

export const Landing = memo(function Playground() {
  const {goBack, navigate} = useNavigation<PortfolioNavigation>();
  const navToItem = useCallback(
    (item: keyof PortfolioRoutes) => () => navigate(item),
    [navigate],
  );
  const renderItem = useCallback(
    ({item}) => <Button key={item} onPress={navToItem(item)} title={item} />,
    [navToItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);

  const color = useColor();
  return (
    <Screen dropShadow onLeftPress={goBack} title="Playground">
      <FlatList
        contentContainerStyle={{paddingHorizontal: padding(4)}}
        data={screens}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
        style={{backgroundColor: color.background.secondary}}
      />
    </Screen>
  );
});
