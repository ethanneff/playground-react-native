// TODO: slider on web
import React, { memo, useCallback, useState } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';
import {
  Button,
  Card,
  MasonryFlashList,
  Screen,
  Slider,
  Text,
  View,
  type FlashListRenderItem,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import {
  changeTheme,
  getLandscapeOrientation,
  themes,
  useAppSelector,
  useAppDispatch,
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

const initialElevation = 2;

type HeaderProps = {
  elevation: number;
  onValueChange: (value: number) => void;
};
const Header = ({ elevation, onValueChange }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const colors = useColors();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const themePress = (theme: Theme) => () => dispatch(changeTheme(theme));

  return (
    <View>
      <View padding={spacing(4)}>
        <View
          alignItems="center"
          flexDirection="row"
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
          defaultValue={initialElevation}
          maximumValue={10}
          minimumTrackTintColor={colors.background.accent}
          minimumValue={0}
          onValueChange={onValueChange}
          step={1}
        />
      </View>
      <Text
        center
        title="Weekly Stats"
        type="h2"
      />
    </View>
  );
};

export const Themes = memo(function Themes() {
  const { goBack } = useNavigation();
  const [elevation, setElevation] = useState(initialElevation);
  const handleSlider = useCallback((value: number) => {
    setElevation(value);
  }, []);
  const landscape = useAppSelector(getLandscapeOrientation);
  const columns = landscape ? 5 : 2;
  const onPress = useCallback(() => undefined, []);

  const renderItem = useCallback<FlashListRenderItem<CardItem>>(
    ({ item }) => (
      <Card
        containerStyle={{ margin: spacing(2) }}
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
      title="Themes"
    >
      <MasonryFlashList
        ListHeaderComponent={
          <Header
            elevation={elevation}
            onValueChange={handleSlider}
          />
        }
        contentContainerStyle={{
          padding: spacing(2),
        }}
        data={cards}
        estimatedItemSize={144}
        extraData={elevation}
        numColumns={columns}
        renderItem={renderItem}
      />
    </Screen>
  );
});
