import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {config} from '../../utils';
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
      backgroundColor: color.primary,
      borderRadius: config.padding(5),
      height: config.padding(5),
      justifyContent: 'center',
      position: 'absolute',
      right: -config.padding(2),
      top: -config.padding(2),
      width: config.padding(5),
    },
    badgeText: {
      color: color.background,
      fontSize: config.padding(2),
    },
  });

  const num = badge > maxBadgeNumber ? badgeLimit : String(badge);
  return badge <= 0 ? null : (
    <View style={styles.badgeContainer}>
      <Text center style={styles.badgeText} title={num} />
    </View>
  );
});
