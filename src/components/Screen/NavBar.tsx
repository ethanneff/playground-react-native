import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../Text';
import {Theme} from '../../utils';
import {useColor} from '../../hooks';
import {NavButton} from './NavButton';

interface Props {
  title?: string;
  border?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?(): void;
  onRightPress?(): void;
}

export const NavBar: React.FC<Props> = ({
  title,
  onLeftPress,
  onRightPress,
  border,
  leftIcon = 'chevron-left',
  rightIcon = 'close',
}) => {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: border ? color.secondary : color.background,
      borderBottomWidth: 1,
      height: Theme.padding.p18,
    },
  });

  return (
    <View style={styles.container}>
      <NavButton icon={leftIcon} onPress={onLeftPress} />
      <Text title={title} type="h2" />
      <NavButton icon={rightIcon} isRight onPress={onRightPress} />
    </View>
  );
};
