import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, FlatList, Screen } from '../../../components';
import { padding, useColors } from '../../../features';
import { PortfolioNavigation, PortfolioRoutes } from '../../Portfolio/types';
import { stackParams } from '../navParams';

const screens = Object.keys(stackParams);

export const Landing = memo(function Playground() {
  const colors = useColors();
  const { goBack, navigate } = useNavigation<PortfolioNavigation>();
  const navToItem = useCallback(
    (item: keyof PortfolioRoutes) => () => navigate(item),
    [navigate],
  );
  const renderItem = useCallback(
    ({ item }) => <Button key={item} onPress={navToItem(item)} title={item} />,
    [navToItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <Screen dropShadow onLeftPress={goBack} title="Playground">
      <FlatList
        contentContainerStyle={{ paddingHorizontal: padding(4) }}
        data={screens}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
        style={{ backgroundColor: colors.background.secondary }}
      />
    </Screen>
  );
});
