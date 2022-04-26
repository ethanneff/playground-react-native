import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import {
  Card,
  FlatList,
  Screen,
  Text,
  TouchableOpacity,
} from '../../../components';
import { padding, useColors } from '../../../features';
import { PortfolioNavigation, PortfolioRoutes } from '../../Portfolio/types';
import { Row } from './Row';
import { Title } from './Title';

const features = [
  'chat',
  'infiniteImages',
  'skeletonLoader',
  'recyclerFlatList',
  'searchBar',
  'swipeFeed',
  'bouncingBalls',
  'pinchSpread',
];

const storybook = [
  'colors',
  'themes',
  'fonts',
  'paragraphs',
  'inputs',
  'modals',
];
const games = [
  'gameOfLife',
  'bejeweled',
  'slotMachine',
  'fortuneWheel',
  'drift',
];

const creations = [
  'ball',
  'drag',
  'okrs',
  'startup',
  'questionnaire',
  'appleMask',
  'appleStopWatch',
  'appleFit',
  'tinder',
];

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
          <Card flex>
            <Title description="component examples" title="storybook" />
            <FlatList
              data={storybook}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <View style={{ padding: padding(2) }} />
          <Card flex>
            <Title description="polished modules" title="features" />
            <FlatList
              data={features}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
        </Row>
        <Row>
          <Card flex>
            <Title description="interactive fun" title="games" />
            <FlatList
              data={games}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <View style={{ padding: padding(2) }} />
          <Card flex>
            <Title description="misc creations" title="creations" />
            <FlatList
              data={creations}
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
