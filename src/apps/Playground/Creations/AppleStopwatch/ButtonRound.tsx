import React, { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable, Text, View } from '../../../../components';
import { useColors, type MonoMultiColor } from '../../../../features';

type RoundButtonProps = {
  background: string;
  color: keyof MonoMultiColor;
  disabled?: boolean;
  onPress: () => void;
  title: string;
};

export const ButtonRound = memo(function ButtonRound({
  background,
  color,
  disabled = false,
  onPress,
  title,
}: RoundButtonProps) {
  const colorScheme = useColors();
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

  const handlePress = useCallback(() => {
    if (disabled) return;
    onPress();
  }, [onPress, disabled]);

  return (
    <Pressable
      containerStyle={styles.button}
      disabled={disabled}
      onPress={handlePress}
    >
      <View style={styles.buttonBorder}>
        <Text
          color={color}
          style={styles.buttonTitle}
          title={title}
        />
      </View>
    </Pressable>
  );
});
