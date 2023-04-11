import React, { memo, useCallback } from 'react';
import {
  Button,
  FlashList,
  Screen,
  Text,
  type FlashListRenderItem,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing } from '../../../features';
import {
  changeTheme,
  themes,
  useAppSelector,
  useAppDispatch,
  type Theme,
} from '../../../redux';

export const Settings = memo(function PortfolioSettings() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const { goBack } = useNavigation();
  const themePress = useCallback(
    (theme: Theme) => () => dispatch(changeTheme(theme)),
    [dispatch],
  );

  const renderItem = useCallback<FlashListRenderItem<Theme>>(
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
      <FlashList
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: spacing(4) }}
        data={themes}
        estimatedItemSize={51}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
