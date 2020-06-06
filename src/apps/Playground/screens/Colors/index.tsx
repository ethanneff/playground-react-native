import React, {memo} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Screen, Text} from '../../../../components';
import {useNav} from '../../../../hooks';
import {ColorTheme, changeTheme} from '../../../../models';
import {Theme, useRootDispatch, useRootSelector} from '../../../../utils';

export default memo(function DebugColors() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const currentTheme = useRootSelector((state) => state.theme.currentColor);
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));
  // text: high 87% medium 60% disabled 38%
  // icon: active 100% inactive 60% disabled 38%
  return (
    <Screen onLeftPress={nav.to('playground')} title="Colors" gutter>
      <Text
        type="h4"
        title="Theme"
        center
        style={{paddingBottom: Theme.padding.p08}}
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {themes.map((item) => (
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
          type="h4"
          title="Buttons"
          center
          style={{padding: Theme.padding.p08}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
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
          <View style={{flex: 1}}>
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
          <View style={{flex: 1}}>
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

        <Text
          type="h4"
          title="Fonts"
          center
          style={{padding: Theme.padding.p08}}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text title="normal" center />
            <Text type="h1" title="h1" />
            <Text type="h2" title="h2" />
            <Text type="h3" title="h3" />
            <Text type="h4" title="type='h4'" />
            <Text type="h5" title="h5" />
            <Text type="h6" title="h6" />
            <Text type="subtitle1" title="subtitle1" />
            <Text type="subtitle2" title="subtitle2" />
            <Text type="body1" title="body1" />
            <Text type="body2" title="body2" />
            <Text type="overline" title="overline" />
            <Text type="caption" title="caption" />
            <Text type="button" title="button" />
            <Text title="default" />
          </View>
          <View style={{flex: 1}}>
            <Text title="high" center />
            <Text emphasis="high" type="h1" title="h1" />
            <Text emphasis="high" type="h2" title="h2" />
            <Text emphasis="high" type="h3" title="h3" />
            <Text emphasis="high" type="h4" title="type='h4'" />
            <Text emphasis="high" type="h5" title="h5" />
            <Text emphasis="high" type="h6" title="h6" />
            <Text emphasis="high" type="subtitle1" title="subtitle1" />
            <Text emphasis="high" type="subtitle2" title="subtitle2" />
            <Text emphasis="high" type="body1" title="body1" />
            <Text emphasis="high" type="body2" title="body2" />
            <Text emphasis="high" type="overline" title="overline" />
            <Text emphasis="high" type="caption" title="caption" />
            <Text emphasis="high" type="button" title="button" />
            <Text emphasis="high" title="default" />
          </View>
          <View style={{flex: 1}}>
            <Text title="medium" center />
            <Text emphasis="medium" type="h1" title="h1" />
            <Text emphasis="medium" type="h2" title="h2" />
            <Text emphasis="medium" type="h3" title="h3" />
            <Text emphasis="medium" type="h4" title="type='h4'" />
            <Text emphasis="medium" type="h5" title="h5" />
            <Text emphasis="medium" type="h6" title="h6" />
            <Text emphasis="medium" type="subtitle1" title="subtitle1" />
            <Text emphasis="medium" type="subtitle2" title="subtitle2" />
            <Text emphasis="medium" type="body1" title="body1" />
            <Text emphasis="medium" type="body2" title="body2" />
            <Text emphasis="medium" type="overline" title="overline" />
            <Text emphasis="medium" type="caption" title="caption" />
            <Text emphasis="medium" type="button" title="button" />
            <Text emphasis="medium" title="default" />
          </View>
          <View style={{flex: 1}}>
            <Text title="low" center />
            <Text emphasis="low" type="h1" title="h1" />
            <Text emphasis="low" type="h2" title="h2" />
            <Text emphasis="low" type="h3" title="h3" />
            <Text emphasis="low" type="h4" title="type='h4'" />
            <Text emphasis="low" type="h5" title="h5" />
            <Text emphasis="low" type="h6" title="h6" />
            <Text emphasis="low" type="subtitle1" title="subtitle1" />
            <Text emphasis="low" type="subtitle2" title="subtitle2" />
            <Text emphasis="low" type="body1" title="body1" />
            <Text emphasis="low" type="body2" title="body2" />
            <Text emphasis="low" type="overline" title="overline" />
            <Text emphasis="low" type="caption" title="caption" />
            <Text emphasis="low" type="button" title="button" />
            <Text emphasis="low" title="default" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
