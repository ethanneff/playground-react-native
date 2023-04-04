import React, { memo, useCallback } from 'react';
import {
  Card,
  FlashList,
  Pressable,
  Screen,
  Text,
  View,
  type FlashListRenderItem,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing } from '../../../features';
import { landingRoutes } from '../navParams';
import { Title } from './Title';

export const Landing = memo(function Playground() {
  const { goBack, navigate } = useNavigation();
  const navToItem = useCallback(
    (item: string) => () => {
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
      navigate(item);
    },
    [navigate],
  );
  const renderItem = useCallback<FlashListRenderItem<string>>(
    ({ item }) => (
      <Pressable onPress={navToItem(item)}>
        <View style={{ paddingVertical: spacing(2) }}>
          <Text
            bold
            title={item}
            type="body2"
          />
        </View>
      </Pressable>
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
        gap={spacing(4)}
        padding={spacing(4)}
      >
        <View
          flex={1}
          flexDirection="row"
          gap={spacing(4)}
        >
          <Card>
            <Title
              description="app components"
              title="storybook"
            />
            <FlashList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(2),
              }}
              data={landingRoutes.storybook}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </Card>
          <Card>
            <Title
              description="polished modules"
              title="features"
            />
            <FlashList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(2),
              }}
              data={landingRoutes.features}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </Card>
        </View>
        <View
          flex={1}
          flexDirection="row"
          gap={spacing(4)}
        >
          <Card>
            <Title
              description="interactive demos"
              title="games"
            />
            <FlashList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(2),
              }}
              data={landingRoutes.games}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </Card>
          <Card>
            <Title
              description="misc ideas"
              title="creations"
            />
            <FlashList
              contentContainerStyle={{
                paddingBottom: spacing(2),
                paddingHorizontal: spacing(2),
              }}
              data={landingRoutes.creations}
              estimatedItemSize={33}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </Card>
        </View>
      </View>
    </Screen>
  );
});
