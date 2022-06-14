import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { padding, useColors } from '../../features';
import { Text } from '../Text';

type Props = {
  badge: number;
};

const badgeLimit = '!';
const maxBadgeNumber = 99;

export const Badge = memo(function IconMeme({ badge }: Props) {
  const colors = useColors();
  const styles = StyleSheet.create({
    badgeContainer: {
      alignItems: 'center',
      backgroundColor: colors.background.accent,
      borderRadius: padding(5),
      height: padding(5),
      justifyContent: 'center',
      position: 'absolute',
      right: -padding(2),
      top: -padding(2),
      width: padding(5),
    },
    badgeText: {
      color: colors.background.primaryA,
      fontSize: padding(2),
    },
  });

  const num = badge > maxBadgeNumber ? badgeLimit : String(badge);
  return badge <= 0 ? null : (
    <View style={styles.badgeContainer}>
      <Text
        center
        style={styles.badgeText}
        title={num}
      />
    </View>
  );
});
