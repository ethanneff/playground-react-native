import React, { memo } from 'react';
import { View, ScrollView } from 'react-native';
import { Screen, Text, Button } from '../../../../components';
import { useNav } from '../../../../hooks';
import { ColorTheme, changeTheme } from '../../../../models';
import { useRootSelector, useRootDispatch, Theme } from '../../../../utils';

export default memo(function DebugColors() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const currentTheme = useRootSelector(state => state.theme.currentColor);
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));
  // text: high 87% medium 60% disabled 38%
  // icon: active 100% inactive 60% disabled 38%
  return (
    <Screen onLeftPress={nav.to('debug')} title="Colors" gutter>
      <Text
        h4
        title="Theme"
        center
        style={{ paddingBottom: Theme.padding.p08 }}
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        {themes.map(item => (
          <Button
            key={item}
            title={item}
            onPress={themePress(item)}
            color={currentTheme === item ? 'success' : 'text'}
          />
        ))}
      </View>
      <ScrollView>
        <Text
          h4
          title="Buttons"
          center
          style={{ padding: Theme.padding.p08 }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button emphasis="high" color="primary" title="primary" />
            <Button emphasis="high" color="secondary" title="secondary" />
            <Button emphasis="high" color="success" title="success" />
            <Button emphasis="high" color="danger" title="danger" />
            <Button emphasis="high" color="warning" title="warning" />
            <Button emphasis="high" color="info" title="info" />
            <Button emphasis="high" color="light" title="light" />
            <Button emphasis="high" color="dark" title="dark" />
            <Button emphasis="high" color="text" title="text" />
            <Button emphasis="high" title="default" />
            <Button emphasis="high" title="disable" disable />
            <Button
              emphasis="high"
              title="drop shadow"
              dropShadow
              elevation={10}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button color="primary" emphasis="medium" title="primary" />
            <Button color="secondary" emphasis="medium" title="secondary" />
            <Button color="success" emphasis="medium" title="success" />
            <Button color="danger" emphasis="medium" title="danger" />
            <Button color="warning" emphasis="medium" title="warning" />
            <Button color="info" emphasis="medium" title="info" />
            <Button color="light" emphasis="medium" title="light" />
            <Button color="dark" emphasis="medium" title="dark" />
            <Button color="text" emphasis="medium" title="text" />
            <Button emphasis="medium" title="default" />
            <Button emphasis="medium" title="disable" disable />
            <Button
              emphasis="medium"
              title="drop shadow"
              dropShadow
              elevation={10}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button color="primary" emphasis="low" title="primary" />
            <Button color="secondary" emphasis="low" title="secondary" />
            <Button color="success" emphasis="low" title="success" />
            <Button color="danger" emphasis="low" title="danger" />
            <Button color="warning" emphasis="low" title="warning" />
            <Button color="info" emphasis="low" title="info" />
            <Button color="light" emphasis="low" title="light" />
            <Button color="dark" emphasis="low" title="dark" />
            <Button color="text" emphasis="low" title="text" />
            <Button emphasis="low" title="default" />
            <Button emphasis="low" title="disable" disable />
            <Button
              emphasis="low"
              title="drop shadow"
              dropShadow
              elevation={10}
            />
          </View>
        </View>

        <Text h4 title="Fonts" center style={{ padding: Theme.padding.p08 }} />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text title="normal" center />
            <Text h1 title="h1" />
            <Text h2 title="h2" />
            <Text h3 title="h3" />
            <Text h4 title="h4" />
            <Text h5 title="h5" />
            <Text h6 title="h6" />
            <Text subtitle1 title="subtitle1" />
            <Text subtitle2 title="subtitle2" />
            <Text body1 title="body1" />
            <Text body2 title="body2" />
            <Text overline title="overline" />
            <Text caption title="caption" />
            <Text button title="button" />
            <Text title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Text title="high" center />
            <Text high h1 title="h1" />
            <Text high h2 title="h2" />
            <Text high h3 title="h3" />
            <Text high h4 title="h4" />
            <Text high h5 title="h5" />
            <Text high h6 title="h6" />
            <Text high subtitle1 title="subtitle1" />
            <Text high subtitle2 title="subtitle2" />
            <Text high body1 title="body1" />
            <Text high body2 title="body2" />
            <Text high overline title="overline" />
            <Text high caption title="caption" />
            <Text high button title="button" />
            <Text high title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Text title="medium" center />
            <Text medium h1 title="h1" />
            <Text medium h2 title="h2" />
            <Text medium h3 title="h3" />
            <Text medium h4 title="h4" />
            <Text medium h5 title="h5" />
            <Text medium h6 title="h6" />
            <Text medium subtitle1 title="subtitle1" />
            <Text medium subtitle2 title="subtitle2" />
            <Text medium body1 title="body1" />
            <Text medium body2 title="body2" />
            <Text medium overline title="overline" />
            <Text medium caption title="caption" />
            <Text medium button title="button" />
            <Text medium title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Text title="low" center />
            <Text low h1 title="h1" />
            <Text low h2 title="h2" />
            <Text low h3 title="h3" />
            <Text low h4 title="h4" />
            <Text low h5 title="h5" />
            <Text low h6 title="h6" />
            <Text low subtitle1 title="subtitle1" />
            <Text low subtitle2 title="subtitle2" />
            <Text low body1 title="body1" />
            <Text low body2 title="body2" />
            <Text low overline title="overline" />
            <Text low caption title="caption" />
            <Text low button title="button" />
            <Text low title="default" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
