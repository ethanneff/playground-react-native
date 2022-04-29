import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import {
  Card,
  FlatList,
  Screen,
  Spacing,
  Text,
  TouchableOpacity,
} from '../../../components';
import { padding, useColors } from '../../../features';
import { PortfolioNavigation, PortfolioRoutes } from '../../Portfolio/types';
import { landingRoutes } from '../navParams';
import { Row } from './Row';
import { Title } from './Title';

export const Landing = memo(function Playground() {
  const colors = useColors();
  const { goBack, navigate } = useNavigation<PortfolioNavigation>();
  const navToItem = useCallback(
    (item: keyof PortfolioRoutes) => () => navigate(item),
    [navigate],
  );
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity key={item} onPress={navToItem(item)}>
        <View style={{ paddingVertical: padding(2) }}>
          <Text bold title={item} type="body2" />
        </View>
      </TouchableOpacity>
    ),
    [navToItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <Screen dropShadow onLeftPress={goBack} title="Playground">
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.secondary,
          paddingVertical: padding(2),
        }}
      >
        <Row>
          <Card flex noPadding>
            <Title description="component examples" title="storybook" />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: padding(4),
                paddingBottom: padding(2),
              }}
              data={landingRoutes.storybook}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <Spacing padding={2} />
          <Card flex noPadding>
            <Title description="polished modules" title="features" />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: padding(4),
                paddingBottom: padding(2),
              }}
              data={landingRoutes.features}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
        </Row>
        <Row>
          <Card flex noPadding>
            <Title description="interactive fun" title="games" />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: padding(4),
                paddingBottom: padding(2),
              }}
              data={landingRoutes.games}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <Spacing padding={2} />
          <Card flex noPadding>
            <Title description="misc creations" title="creations" />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: padding(4),
                paddingBottom: padding(2),
              }}
              data={landingRoutes.creations}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
        </Row>
      </View>
    </Screen>
  );
});
