// TODO: slider on web
import React, {memo, useCallback, useState} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {
  Button,
  Card,
  Masonry,
  Screen,
  Slider,
  Text,
} from '../../../../components';
import {
  ColorTheme,
  changeTheme,
  getLandscapeOrientation,
} from '../../../../models';
import {Theme, useRootDispatch, useRootSelector} from '../../../../utils';
import {useColor, useNav} from '../../../../hooks';

interface Card {
  title: string;
  value: string;
  target?: string;
  chart?: ImageSourcePropType;
  button?: string;
}

const image = require('../../../../assets/placeholder.png');
const cards: Card[] = [
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
    target: '11% of target',
    title: 'Sales',
    value: '35.8 M',
    chart: image,
  },
  {
    button: 'save',
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
];

export default memo(function DarkMode() {
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const color = useColor();
  const nav = useNav();
  const currentTheme = useRootSelector((state) => state.theme.currentColor);
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));
  const [elevation, setElevation] = useState(2);
  const handleSlider = useCallback((value: number) => setElevation(value), []);
  const landscape = useRootSelector(getLandscapeOrientation);
  const columns = landscape ? 5 : 3;
  const onPress = useCallback(() => undefined, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <Card elevation={elevation} key={index} onPress={onPress}>
        <Text title={item.title} type="overline" />
        <Text
          style={{marginTop: Theme.padding.p02}}
          title={item.value}
          type="h3"
        />
        {item.target && (
          <Text
            style={{marginTop: Theme.padding.p02}}
            title={item.target}
            type="body2"
          />
        )}
        {item.chart && (
          <Image
            source={item.chart}
            style={{
              height: 80,
              marginTop: Theme.padding.p02,
              resizeMode: 'cover',
              width: '100%',
            }}
          />
        )}
        {item.button && (
          <Button
            buttonStyle={{marginTop: Theme.padding.p02}}
            color="primary"
            emphasis="high"
            title={item.button}
          />
        )}
      </Card>
    ),
    [elevation, onPress],
  );

  return (
    <Screen onLeftPress={nav.to('playground')} title="Dark mode">
      <View style={{padding: Theme.padding.p04}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text title="theme: " />
          {themes.map((item) => (
            <Button
              color={currentTheme === item ? 'primary' : 'text'}
              emphasis="high"
              key={item}
              onPress={themePress(item)}
              title={item}
            />
          ))}
        </View>
        <Text title={`elevation: ${elevation}`} />
        <Slider
          maximumValue={10}
          minimumTrackTintColor={color.primary}
          minimumValue={0}
          onValueChange={handleSlider}
          step={1}
          value={elevation}
        />
      </View>
      <Text center title="Weekly Stats" type="h2" />
      <Masonry data={cards} numColumns={columns} renderItem={renderItem} />
    </Screen>
  );
});
