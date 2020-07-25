import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Screen} from '../../../../components';
import {ColorTheme, changeTheme} from '../../../../models';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {useNav} from '../../../../hooks';

const themes = Object.values(ColorTheme);
export default memo(function PortfolioSettings() {
  const dispatch = useRootDispatch();
  const currentTheme = useRootSelector((state) => state.theme.currentColor);
  const nav = useNav();
  const themePress = useCallback(
    (theme: ColorTheme) => () => dispatch(changeTheme(theme)),
    [dispatch],
  );
  const renderItem = useCallback(
    ({item}) => (
      <View>
        <Button
          color={currentTheme === item ? 'primary' : 'text'}
          key={item}
          onPress={themePress(item)}
          title={item}
        />
      </View>
    ),
    [currentTheme, themePress],
  );

  const renderHeader = useCallback(() => <Button disable title="Theme" />, []);
  const keyExtractor = useCallback((item) => item, []);

  const navBack = useCallback(nav('portfolioLanding'), [nav]);
  return (
    <Screen onLeftPress={navBack} title="Settings">
      <FlatList
        data={themes}
        horizontal
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
      />
    </Screen>
  );
});
