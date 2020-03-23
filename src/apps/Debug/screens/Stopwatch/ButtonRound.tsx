import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface RoundButtonProps {
  title: string;
  color: string;
  background: string;
  disabled?: boolean;
  onPress(): void;
}

export default memo(function ButtonRound({
  title,
  color,
  background,
  onPress,
  disabled = false,
}: RoundButtonProps) {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: 40,
      height: 80,
      justifyContent: 'center',
      width: 80,
    },
    buttonBorder: {
      alignItems: 'center',
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

  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
});
