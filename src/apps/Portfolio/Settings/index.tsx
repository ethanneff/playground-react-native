import React, { memo, useCallback } from 'react';
import {
  Button,
  FlatList,
  Screen,
  Text,
  type FlatListRenderItem,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing } from '../../../features';
import {
  changeTheme,
  themes,
  useRootDispatch,
  useRootSelector,
  type Theme,
} from '../../../redux';

export const Settings = memo(function PortfolioSettings() {
  const dispatch = useRootDispatch();
  const currentTheme = useRootSelector((state) => state.theme.currentTheme);
  const { goBack } = useNavigation();
  const themePress = useCallback(
    (theme: Theme) => () => dispatch(changeTheme(theme)),
    [dispatch],
  );

  const renderItem = useCallback<FlatListRenderItem<Theme>>(
    ({ item }) => (
      <Button
        color={currentTheme === item ? 'positive' : 'primaryA'}
        onPress={themePress(item)}
        title={item}
      />
    ),
    [currentTheme, themePress],
  );
  const renderHeader = useCallback(
    () => (
      <Text
        title="Theme"
        type="button"
      />
    ),
    [],
  );
  const keyExtractor = useCallback((item: Theme) => item, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Settings"
    >
      <FlatList
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: spacing(4) }}
        data={themes}
        estimatedItemSize={51}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
    </Screen>
  );
});
