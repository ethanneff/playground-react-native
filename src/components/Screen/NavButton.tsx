import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { spacing } from '../../features';
import { Icon, IconName } from '../Icon';
import { TouchableOpacity } from '../TouchableOpacity';

type Props = {
  icon?: IconName;
  notLeft?: boolean;
  onPress?: () => void;
  testID: string;
};

export const NavButton = memo(function NavButton({
  icon = 'chevron-up',
  notLeft,
  onPress,
  testID,
}: Props) {
  const styles = StyleSheet.create({
    button: { padding: spacing(2) },
    buttonRight: { alignSelf: 'flex-end' },
  });
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={styles.button}
    >
      <Icon
        color="secondary"
        hidden={!onPress}
        name={icon}
        size={spacing(8)}
        style={notLeft ? styles.buttonRight : null}
        testID={testID}
      />
    </TouchableOpacity>
  );
});
