import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Screen} from '../../../components';
import {ColorTheme, changeTheme, colorThemes} from '../../../models';
import {useRootDispatch, useRootSelector} from '../../../utils';

export const Settings = memo(function PortfolioSettings() {
  const dispatch = useRootDispatch();
  const currentTheme = useRootSelector((state) => state.theme.currentColor);
  const {goBack} = useNavigation();
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

  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="Settings">
      <FlatList
        ListHeaderComponent={renderHeader}
        data={colorThemes}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
