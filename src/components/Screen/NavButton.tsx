import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { padding } from '../../features/Config';
import { Icon } from '../Icon';
import { TouchableOpacity } from '../TouchableOpacity';

type Props = {
  icon?: string;
  notLeft?: boolean;
  onPress?: () => void;
  testID: string;
};

export const NavButton = memo(function NavButton({
  onPress = undefined,
  icon = 'chevron-up',
  notLeft,
  testID,
}: Props) {
  const styles = StyleSheet.create({
    button: { padding: padding(2) },
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
        size={padding(8)}
        style={notLeft && styles.buttonRight}
        testID={testID}
      />
    </TouchableOpacity>
  );
});
