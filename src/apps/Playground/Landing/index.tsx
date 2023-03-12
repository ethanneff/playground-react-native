import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import {
  Card,
  FlatList,
  type FlatListRenderItem,
  Screen,
  Spacing,
  Text,
  TouchableOpacity,
  View,
} from '../../../components';
import { spacing, useColors } from '../../../features';
import { landingRoutes } from '../navParams';
import { Row } from './Row';
import { Title } from './Title';

export const Landing = memo(function Playground() {
  const colors = useColors();
  const { goBack, navigate } = useNavigation();
  const navToItem = useCallback(
    (item: string) => () => {
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
      navigate(item);
    },
    [navigate],
  );
  const renderItem = useCallback<FlatListRenderItem<string>>(
    ({ item }) => (
      <TouchableOpacity onPress={navToItem(item)}>
        <View style={{ paddingVertical: spacing(2) }}>
          <Text
            bold
            title={item}
            type="body2"
          />
        </View>
      </TouchableOpacity>
    ),
    [navToItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Playground"
    >
      <View
        style={{
          backgroundColor: colors.background.secondary,
          flex: 1,
          paddingVertical: spacing(2),
        }}
      >
        <Row>
          <Card
            flex
            noPadding
          >
            <Title
              description="component examples"
              title="storybook"
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(4),
              }}
              data={landingRoutes.storybook}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <Spacing padding={2} />
          <Card
            flex
            noPadding
          >
            <Title
              description="polished modules"
              title="features"
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(4),
              }}
              data={landingRoutes.features}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
        </Row>
        <Row>
          <Card
            flex
            noPadding
          >
            <Title
              description="interactive fun"
              title="games"
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(4),
              }}
              data={landingRoutes.games}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <Spacing padding={2} />
          <Card
            flex
            noPadding
          >
            <Title
              description="misc creations"
              title="creations"
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(4),
              }}
              data={landingRoutes.creations}
              estimatedItemSize={33}
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
