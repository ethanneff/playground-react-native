import React, { memo } from 'react';
import { Button, View } from '../../../../components';
import {
  changeTheme,
  useAppSelector,
  useAppDispatch,
  type Theme,
} from '../../../../redux';

export const ThemeGroup = memo(function ThemeGroup() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const themes = useAppSelector((state) => state.theme.themes);
  const themePress = (theme: Theme) => () => dispatch(changeTheme(theme));
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {Object.keys(themes).map((key) => (
        <Button
          center
          color={currentTheme === key ? 'positive' : 'primaryA'}
          emphasis="high"
          key={key}
          onPress={themePress(key as Theme)}
          title={key}
        />
      ))}
    </View>
  );
});
