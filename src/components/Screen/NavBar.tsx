import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {Text} from '../Text';
import {NavButton} from './NavButton';

interface Props {
  title?: string;
  border?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?(): void;
  onRightPress?(): void;
  dropShadow?: boolean;
  height: number;
}

export const NavBar = memo(
  ({
    title,
    onLeftPress,
    onRightPress,
    border,
    leftIcon = 'chevron-left',
    rightIcon = 'close',
    height,
    dropShadow,
  }: Props) => {
    const color = useColor();
    const shadow = useDropShadow();
    const showShadow = dropShadow ? shadow(2) : {};
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        backgroundColor: color.background,
        borderBottomColor: border ? color.secondary : color.background,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height,
        justifyContent: 'space-between',
        ...showShadow,
      },
    });

    return (
      <View style={styles.container}>
        <NavButton icon={leftIcon} onPress={onLeftPress} testID="leftNav" />
        <Text
          center
          emphasis="high"
          flex
          numberOfLines={1}
          title={title}
          type="h3"
        />
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
