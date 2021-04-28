import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {config} from '../../utils';
import {Icon} from '../Icon';

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
    button: {padding: config.padding(2)},
    buttonRight: {alignSelf: 'flex-end'},
  });
  return (
    <View style={styles.button}>
      <Icon
        color={color.secondary}
        hidden={!onPress}
        name={icon}
        onPress={onPress}
        size={config.padding(8)}
        style={isRight && styles.buttonRight}
        testID={testID}
      />
    </View>
  );
});
