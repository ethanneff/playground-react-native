import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Screen} from '../../../../components';
import {ColorTheme, changeTheme} from '../../../../models';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioSettings() {
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
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
          key={item}
          title={item}
          onPress={themePress(item)}
          color={currentTheme === item ? 'primary' : 'text'}
        />
      </View>
    ),
    [currentTheme, themePress],
  );

  const renderHeader = useCallback(() => <Button disable title="Theme" />, []);
  const keyExtractor = useCallback((item) => item, []);
  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Settings">
      <FlatList
        ListHeaderComponent={renderHeader}
        horizontal
        keyExtractor={keyExtractor}
        data={themes}
        renderItem={renderItem}
      />
    </Screen>
  );
});
