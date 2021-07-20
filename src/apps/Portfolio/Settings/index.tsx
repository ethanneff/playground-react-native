import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {Button, Screen} from '../../../components';
import {changeTheme, Theme} from '../../../models';
import {useRootDispatch, useRootSelector} from '../../../utils';

export const Settings = memo(function PortfolioSettings() {
  const dispatch = useRootDispatch();
  const currentTheme = useRootSelector(state => state.theme.currentTheme);
  const themes = useRootSelector(state => state.theme.themes);
  const {goBack} = useNavigation();
  const themePress = useCallback(
    (theme: Theme) => () => dispatch(changeTheme(theme)),
    [dispatch],
  );
  const renderItem = useCallback<ListRenderItem<Theme>>(
    ({item}) => (
      <View>
        <Button
          color={currentTheme === item ? 'positive' : 'primaryA'}
          key={item}
          onPress={themePress(item)}
          title={item}
        />
      </View>
    ),
    [currentTheme, themePress],
  );
  const renderHeader = useCallback(() => <Button disabled title="Theme" />, []);
  const keyExtractor = useCallback(item => item, []);

  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen dropShadow onLeftPress={navBack} title="Settings">
      <FlatList
        ListHeaderComponent={renderHeader}
        data={Object.keys(themes)}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
    </Screen>
  );
});
