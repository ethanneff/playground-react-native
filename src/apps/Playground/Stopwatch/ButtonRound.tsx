import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity} from '../../../components';

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

  const handlePress = useCallback(() => !disabled && onPress(), [
    onPress,
    disabled,
  ]);

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1.0 : 0.7}
      onPress={handlePress}
      style={[styles.button, {backgroundColor: background}]}>
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, {color}]} title={title} />
      </View>
    </TouchableOpacity>
  );
});
