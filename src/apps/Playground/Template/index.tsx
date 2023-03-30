import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Screen, Text, View } from '../../../components';
import { useNavigation } from '../../../conversions';
import { useColors } from '../../../features';
import { themeActions, useRootDispatch, useRootSelector } from '../../../redux';

export const Template = () => {
  const colors = useColors();
  const { goBack } = useNavigation();
  const [value, setValue] = useState(0);
  const dispatch = useRootDispatch();
  const theme = useRootSelector((state) => state.theme.currentTheme);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.primaryA,
    },
  });

  const handleIncrease = useCallback(() => {
    setValue((p) => p + 1);
  }, []);

  const handleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(themeActions.changeTheme(nextTheme));
  }, [dispatch, theme]);

  return (
    <Screen
      onLeftPress={goBack}
      title="Template"
    >
      <View style={styles.container}>
        <Text title={`Theme color: ${theme}`} />
        <Button
          onPress={handleTheme}
          title="toggle theme"
        />
        <Text
          testID="increase-value"
          title={String(value)}
        />
        <Button
          onPress={handleIncrease}
          testID="increase-button"
          title="increase"
        />
      </View>
    </Screen>
  );
};
