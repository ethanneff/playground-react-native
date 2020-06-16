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
    <Screen gutter onLeftPress={nav.to('playground')} title="Colors">
      <Text
        center
        style={{paddingBottom: Theme.padding.p08}}
        title="Theme"
        type="h4"
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {themes.map((item) => (
          <Button
            color={currentTheme === item ? 'success' : 'text'}
            key={item}
            onPress={themePress(item)}
            title={item}
          />
        ))}
      </View>
      <ScrollView>
        <Text
          center
          style={{padding: Theme.padding.p08}}
          title="Buttons"
          type="h4"
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Button color="primary" emphasis="high" title="primary" />
            <Button color="secondary" emphasis="high" title="secondary" />
            <Button color="success" emphasis="high" title="success" />
            <Button color="danger" emphasis="high" title="danger" />
            <Button color="warning" emphasis="high" title="warning" />
            <Button color="info" emphasis="high" title="info" />
            <Button color="light" emphasis="high" title="light" />
            <Button color="dark" emphasis="high" title="dark" />
            <Button color="text" emphasis="high" title="text" />
            <Button emphasis="high" title="default" />
            <Button disable emphasis="high" title="disable" />
            <Button
              dropShadow
              elevation={10}
              emphasis="high"
              title="drop shadow"
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
            <Button disable emphasis="medium" title="disable" />
            <Button
              dropShadow
              elevation={10}
              emphasis="medium"
              title="drop shadow"
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
            <Button disable emphasis="low" title="disable" />
            <Button
              dropShadow
              elevation={10}
              emphasis="low"
              title="drop shadow"
            />
          </View>
        </View>

        <Text
          center
          style={{padding: Theme.padding.p08}}
          title="Fonts"
          type="h4"
        />

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text center title="normal" />
            <Text title="h1" type="h1" />
            <Text title="h2" type="h2" />
            <Text title="h3" type="h3" />
            <Text title="type='h4'" type="h4" />
            <Text title="h5" type="h5" />
            <Text title="h6" type="h6" />
            <Text title="subtitle1" type="subtitle1" />
            <Text title="subtitle2" type="subtitle2" />
            <Text title="body1" type="body1" />
            <Text title="body2" type="body2" />
            <Text title="overline" type="overline" />
            <Text title="caption" type="caption" />
            <Text title="button" type="button" />
            <Text title="default" />
          </View>
          <View style={{flex: 1}}>
            <Text center title="high" />
            <Text emphasis="high" title="h1" type="h1" />
            <Text emphasis="high" title="h2" type="h2" />
            <Text emphasis="high" title="h3" type="h3" />
            <Text emphasis="high" title="type='h4'" type="h4" />
            <Text emphasis="high" title="h5" type="h5" />
            <Text emphasis="high" title="h6" type="h6" />
            <Text emphasis="high" title="subtitle1" type="subtitle1" />
            <Text emphasis="high" title="subtitle2" type="subtitle2" />
            <Text emphasis="high" title="body1" type="body1" />
            <Text emphasis="high" title="body2" type="body2" />
            <Text emphasis="high" title="overline" type="overline" />
            <Text emphasis="high" title="caption" type="caption" />
            <Text emphasis="high" title="button" type="button" />
            <Text emphasis="high" title="default" />
          </View>
          <View style={{flex: 1}}>
            <Text center title="medium" />
            <Text emphasis="medium" title="h1" type="h1" />
            <Text emphasis="medium" title="h2" type="h2" />
            <Text emphasis="medium" title="h3" type="h3" />
            <Text emphasis="medium" title="type='h4'" type="h4" />
            <Text emphasis="medium" title="h5" type="h5" />
            <Text emphasis="medium" title="h6" type="h6" />
            <Text emphasis="medium" title="subtitle1" type="subtitle1" />
            <Text emphasis="medium" title="subtitle2" type="subtitle2" />
            <Text emphasis="medium" title="body1" type="body1" />
            <Text emphasis="medium" title="body2" type="body2" />
            <Text emphasis="medium" title="overline" type="overline" />
            <Text emphasis="medium" title="caption" type="caption" />
            <Text emphasis="medium" title="button" type="button" />
            <Text emphasis="medium" title="default" />
          </View>
          <View style={{flex: 1}}>
            <Text center title="low" />
            <Text emphasis="low" title="h1" type="h1" />
            <Text emphasis="low" title="h2" type="h2" />
            <Text emphasis="low" title="h3" type="h3" />
            <Text emphasis="low" title="type='h4'" type="h4" />
            <Text emphasis="low" title="h5" type="h5" />
            <Text emphasis="low" title="h6" type="h6" />
            <Text emphasis="low" title="subtitle1" type="subtitle1" />
            <Text emphasis="low" title="subtitle2" type="subtitle2" />
            <Text emphasis="low" title="body1" type="body1" />
            <Text emphasis="low" title="body2" type="body2" />
            <Text emphasis="low" title="overline" type="overline" />
            <Text emphasis="low" title="caption" type="caption" />
            <Text emphasis="low" title="button" type="button" />
            <Text emphasis="low" title="default" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
