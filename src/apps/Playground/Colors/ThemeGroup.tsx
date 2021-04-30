import React, {memo} from 'react';
import {View} from 'react-native';
import {Button} from '../../../components';
import {changeTheme, ColorTheme, colorThemes} from '../../../models';
import {useRootDispatch, useRootSelector} from '../../../utils';

export const ThemeGroup = memo(function ThemeGroup() {
  const dispatch = useRootDispatch();
  const currentTheme = useRootSelector(state => state.theme.currentColor);
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {colorThemes.map(item => (
        <Button
          center
          color={currentTheme === item ? 'green' : 'text'}
          emphasis="medium"
          key={item}
          onPress={themePress(item)}
          title={item}
        />
      ))}
    </View>
  );
});
