import React from 'react';
import { Button, View } from '../../../../components';
import {
  changeTheme,
  useAppDispatch,
  useAppSelector,
  type Theme,
} from '../../../../redux';

export const ThemeGroup = () => {
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
};
