// TODO: slider on web
import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';
import {
  Button,
  Card,
  Masonry,
  Screen,
  ScrollView,
  Slider,
  Text,
  View,
  type FlatListRenderItem,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';
import {
  changeTheme,
  getLandscapeOrientation,
  themes,
  useRootDispatch,
  useRootSelector,
  type Theme,
} from '../../../../redux';

type CardItem = {
  button?: string;
  chart?: ImageSourcePropType;
  target?: string;
  title: string;
  value: string;
};

const image =
  require('../../../../assets/placeholder.png') as ImageSourcePropType;
const cards: CardItem[] = [
  {
    title: 'Marketing',
    value: '12.4 M',
  },
  {
    target: '+22% of target',
    title: 'Conversion',
    value: '537',
  },
  {
    chart: image,
    target: '+12.3 of target',
    title: 'Conversion',
    value: '42.1 M',
  },
  {
    chart: image,
    target: '11% of target',
    title: 'Sales',
    value: '35.8 M',
  },
  {
    button: 'view',
    title: 'Users',
    value: '45.5 M',
  },
  {
    target: '+56.6% of target',
    title: 'Avg session',
    value: '4:53 H',
  },
  {
    title: 'Sessions',
    value: '23.242',
  },
  {
    title: 'Bounce rate',
    value: '12%',
  },
  {
    button: 'view',
    target: '+45.1 of target',
    title: 'Churn',
    value: '8%',
  },
  {
    title: 'Spend',
    value: '18.4 M',
  },
];

export const Themes = memo(function Themes() {
  const dispatch = useRootDispatch();
  const colors = useColors();
  const { goBack } = useNavigation();
  const currentTheme = useRootSelector((state) => state.theme.currentTheme);
  const themePress = (theme: Theme) => () => dispatch(changeTheme(theme));
  const [elevation, setElevation] = useState(2);
  const handleSlider = useCallback((value: number) => {
    setElevation(value);
  }, []);
  const landscape = useRootSelector(getLandscapeOrientation);
  const columns = landscape ? 5 : 2;
  const onPress = useCallback(() => undefined, []);

  const renderItem = useCallback<FlatListRenderItem<CardItem>>(
    ({ item }) => (
      <Card
        elevation={elevation}
        onPress={onPress}
      >
        <Text
          title={item.title}
          type="overline"
        />
        <Text
          style={{ marginTop: spacing(2) }}
          title={item.value}
          type="h4"
        />
        {item.target ? (
          <Text
            style={{ marginTop: spacing(2) }}
            title={item.target}
            type="body2"
          />
        ) : null}
        {item.chart ? (
          <Image
            source={item.chart}
            style={{
              height: 100,
              marginTop: spacing(2),
              resizeMode: 'cover',
              width: '100%',
            }}
          />
        ) : null}
        {item.button ? (
          <Button
            buttonStyle={{ marginTop: spacing(2) }}
            center
            color="accent"
            emphasis="high"
            onPress={onPress}
            title={item.button}
          />
        ) : null}
      </Card>
    ),
    [elevation, onPress],
  );

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Dark mode"
    >
      <ScrollView style={{ backgroundColor: colors.background.primaryA }}>
        <View style={{ padding: spacing(4) }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text title="theme: " />
            {themes.map((item) => (
              <Button
                color={currentTheme === item ? 'positive' : 'primaryA'}
                emphasis="low"
                key={item}
                onPress={themePress(item)}
                title={item}
              />
            ))}
          </View>
          <Text title={`elevation: ${elevation}`} />
          <Slider
            maximumValue={10}
            minimumTrackTintColor={colors.background.accent}
            minimumValue={0}
            onValueChange={handleSlider}
            step={1}
            value={elevation}
          />
        </View>
        <Text
          center
          title="Weekly Stats"
          type="h2"
        />
        <Masonry
          data={cards}
          numColumns={columns}
          // @ts-expect-error Type 'Record<string, unknown>' is missing the following properties from type 'ListRenderItemInfo<CardItem>': item, index, separators
          renderItem={renderItem}
        />
      </ScrollView>
    </Screen>
  );
});
