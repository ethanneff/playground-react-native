import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity} from '../../../components';
import {MonoMultiColor, useColor} from '../../../features';

interface RoundButtonProps {
  title: string;
  color: keyof MonoMultiColor;
  background: string;
  disabled?: boolean;
  onPress(): void;
}

export const ButtonRound = memo(function ButtonRound({
  title,
  color,
  background,
  onPress,
  disabled = false,
}: RoundButtonProps) {
  const colorScheme = useColor();
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: background,
      borderRadius: 40,
      height: 80,
      justifyContent: 'center',
      width: 80,
    },
    buttonBorder: {
      alignItems: 'center',
      borderColor: colorScheme.background.primaryB,
      borderRadius: 38,
      borderWidth: 1,
      height: 76,
      justifyContent: 'center',
      width: 76,
    },
    buttonTitle: {
      fontSize: 18,
    },
  });

  const handlePress = useCallback(
    () => !disabled && onPress(),
    [onPress, disabled],
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      style={styles.button}>
      <View style={styles.buttonBorder}>
        <Text color={color} style={styles.buttonTitle} title={title} />
      </View>
    </TouchableOpacity>
  );
});
