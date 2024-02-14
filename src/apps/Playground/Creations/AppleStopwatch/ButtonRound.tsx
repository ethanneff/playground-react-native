import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable, Text, View } from '../../../../components';
import { useColors, type MonoMultiColor } from '../../../../features';

type RoundButtonProperties = {
  readonly background: string;
  readonly color: keyof MonoMultiColor;
  readonly disabled?: boolean;
  readonly onPress: () => void;
  readonly title: string;
};

export const ButtonRound = ({
  background,
  color,
  disabled = false,
  onPress,
  title,
}: RoundButtonProperties) => {
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
};
