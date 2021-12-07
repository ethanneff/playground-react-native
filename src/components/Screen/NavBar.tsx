import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { padding } from '../../features/Config';
import { useColor, useDropShadow } from '../../features/Theme';
import { Text } from '../Text';
import { NavButton } from './NavButton';

type Props = {
  border?: boolean;
  dropShadow?: boolean;
  leftIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onSecondLeftPress?: () => void;
  onSecondRightPress?: () => void;
  rightIcon?: string;
  secondLeftIcon?: string;
  secondRightIcon?: string;
  title?: string;
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
  const showShadow = dropShadow ? shadow(4) : {};
  const secondary = onSecondRightPress || onSecondLeftPress;
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
      zIndex: 2,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <NavButton icon={leftIcon} onPress={onLeftPress} testID="leftNav" />
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
            notLeft
            onPress={onSecondRightPress}
            testID="secondRightNav"
          />
        )}
        <NavButton
          icon={rightIcon}
          notLeft
          onPress={onRightPress}
          testID="rightNav"
        />
      </View>
      <View
        style={{
          backgroundColor: color.background.primaryA,
          width: '100%',
          height: 2,
          ...showShadow,
          zIndex: 1,
        }}
      />
    </>
  );
});
