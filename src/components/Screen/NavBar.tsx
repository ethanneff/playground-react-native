import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {padding} from '../../features/Config';
import {useColor, useDropShadow} from '../../features/Theme';
import {Text} from '../Text';
import {NavButton} from './NavButton';

type Props = {
  title?: string;
  border?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  secondLeftIcon?: string;
  secondRightIcon?: string;
  onSecondLeftPress?: () => void;
  onSecondRightPress?: () => void;
  dropShadow?: boolean;
};

export const NavBar = memo(function NavBar({
  title,
  onLeftPress,
  onRightPress,
  border,
  leftIcon = 'chevron-left',
  rightIcon = 'close',
  dropShadow,
  secondLeftIcon,
  secondRightIcon,
  onSecondLeftPress,
  onSecondRightPress,
}: Props) {
  const color = useColor();
  const shadow = useDropShadow();
  const showShadow = dropShadow ? shadow(2) : {};
  const secondary = onSecondRightPress || onSecondLeftPress;
  const primary = onRightPress || onLeftPress;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: color.background.primaryA,
      borderBottomColor: border
        ? color.background.secondary
        : color.background.primaryA,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: padding(2),
      ...showShadow,
    },
  });

  return (
    <View style={styles.container}>
      {primary && (
        <NavButton icon={leftIcon} onPress={onLeftPress} testID="leftNav" />
      )}
      {secondary && (
        <NavButton
          icon={secondLeftIcon}
          onPress={onSecondLeftPress}
          testID="secondLeftNav"
        />
      )}
      <Text center flex numberOfLines={1} title={title} type="h4" />
      {secondary && (
        <NavButton
          icon={secondRightIcon}
          isRight
          onPress={onSecondRightPress}
          testID="secondRightNav"
        />
      )}
      {primary && (
        <NavButton
          icon={rightIcon}
          isRight
          onPress={onRightPress}
          testID="rightNav"
        />
      )}
    </View>
  );
});
