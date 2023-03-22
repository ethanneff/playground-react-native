import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import {
  Card,
  FlatList,
  Screen,
  Text,
  TouchableOpacity,
  View,
  type FlatListRenderItem,
} from '../../../components';
import { spacing, useColors } from '../../../features';
import { landingRoutes } from '../navParams';
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
        backgroundColor="secondary"
        flex={1}
        paddingHorizontal={spacing(4)}
        paddingVertical={spacing(2)}
      >
        <View
          flex={1}
          flexDirection="row"
          gap={spacing(4)}
        >
          <Card>
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
          <Card>
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
        </View>
        <View
          flex={1}
          flexDirection="row"
          gap={spacing(4)}
        >
          <Card contentStyle={{ flex: 1 }}>
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

          <Card contentStyle={{ flex: 1 }}>
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
        </View>
      </View>
    </Screen>
  );
});
