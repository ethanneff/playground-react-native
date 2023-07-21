import React from 'react';
import { StyleSheet } from 'react-native';
import { spacing } from '../../features';
import { Icon, type IconName } from '../Icon';
import { Pressable } from '../Pressable';

type Props = {
  readonly icon?: IconName;
  readonly notLeft?: boolean;
  readonly onPress?: () => void;
  readonly testID: string;
};

export const NavButton = ({
  icon = 'chevron-up',
  notLeft,
  onPress,
  testID,
}: Props) => {
  const styles = StyleSheet.create({
    button: { padding: spacing(2) },
    buttonRight: { alignSelf: 'flex-end' },
  });
  return (
    <Pressable
      containerStyle={styles.button}
      disabled={!onPress}
      onPress={onPress}
    >
      <Icon
        color="secondary"
        hidden={!onPress}
        name={icon}
        size={spacing(8)}
        style={notLeft ? styles.buttonRight : null}
        testID={testID}
      />
    </Pressable>
  );
};
