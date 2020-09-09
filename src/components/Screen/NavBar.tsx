import React, {memo} from 'react';
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

export const NavBar = memo(
  ({
    title,
    onLeftPress,
    onRightPress,
    border,
    leftIcon = 'chevron-left',
    rightIcon = 'close',
  }: Props) => {
    const color = useColor();
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        borderBottomColor: border ? color.secondary : color.background,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: Theme.padding.p18,
        justifyContent: 'space-between',
      },
    });

    return (
      <View style={styles.container}>
        <NavButton icon={leftIcon} onPress={onLeftPress} testID="leftNav" />
        <Text title={title} type="h2" />
        <NavButton
          icon={rightIcon}
          isRight
          onPress={onRightPress}
          testID="rightNav"
        />
      </View>
    );
  },
);
