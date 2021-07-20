import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {useColor} from '../../hooks';
import {padding} from '../../utils';
import {Icon} from '../Icon';
import {TouchableOpacity} from '../TouchableOpacity';

interface Props {
  icon?: string;
  isRight?: boolean;
  onPress?: () => void;
  testID: string;
}

export const NavButton = memo(function NavButton({
  onPress = undefined,
  icon = 'chevron-up',
  isRight = false,
  testID,
}: Props) {
  const color = useColor();
  const styles = StyleSheet.create({
    button: {padding: padding(2)},
    buttonRight: {alignSelf: 'flex-end'},
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon
        color={color.text.secondary}
        hidden={!onPress}
        name={icon}
        size={padding(8)}
        style={isRight && styles.buttonRight}
        testID={testID}
      />
    </TouchableOpacity>
  );
});
