import React, {memo} from 'react';
import {View} from 'react-native';
import {Button} from '../../../components';
import {changeTheme, Theme} from '../../../models';
import {useRootDispatch, useRootSelector} from '../../../utils';

export const ThemeGroup = memo(function ThemeGroup() {
  const dispatch = useRootDispatch();
  const currentTheme = useRootSelector(state => state.theme.currentTheme);
  const themes = useRootSelector(state => state.theme.themes);
  const themePress = (theme: Theme) => () => dispatch(changeTheme(theme));
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {Object.keys(themes).map(key => (
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
