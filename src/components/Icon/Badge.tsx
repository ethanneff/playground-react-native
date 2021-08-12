import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {padding} from '../../features/Config';
import {useColor} from '../../features/Theme';
import {Text} from '../Text';

interface Props {
  badge: number;
}

const badgeLimit = '!';
const maxBadgeNumber = 99;

export const Badge = memo(({badge}: Props) => {
  const color = useColor();
  const styles = StyleSheet.create({
    badgeContainer: {
      alignItems: 'center',
      backgroundColor: color.background.accent,
      borderRadius: padding(5),
      height: padding(5),
      justifyContent: 'center',
      position: 'absolute',
      right: -padding(2),
      top: -padding(2),
      width: padding(5),
    },
    badgeText: {
      color: color.background.primaryA,
      fontSize: padding(2),
    },
  });

  const num = badge > maxBadgeNumber ? badgeLimit : String(badge);
  return badge <= 0 ? null : (
    <View style={styles.badgeContainer}>
      <Text center style={styles.badgeText} title={num} />
    </View>
  );
});
