import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components';
import { spacing, useColors, useDropShadow } from '../../features';
import { IconName } from '../Icon';
import { Text } from '../Text';
import { NavButton } from './NavButton';

type Props = {
  border?: boolean;
  dropShadow?: boolean;
  leftIcon?: IconName;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onSecondLeftPress?: () => void;
  onSecondRightPress?: () => void;
  rightIcon?: IconName;
  secondLeftIcon?: IconName;
  secondRightIcon?: IconName;
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
  const colors = useColors();
  const shadow = useDropShadow();
  const showShadow = dropShadow ? shadow(4) : {};
  const secondary = onSecondRightPress ?? onSecondLeftPress;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background.primaryA,
      borderBottomColor: border
        ? colors.background.secondary
        : colors.background.primaryA,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing(2),
      zIndex: 2,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <NavButton
          icon={leftIcon}
          onPress={onLeftPress}
          testID="leftNav"
        />
        {secondary ? (
          <NavButton
            icon={secondLeftIcon}
            onPress={onSecondLeftPress}
            testID="secondLeftNav"
          />
        ) : null}
        <Text
          center
          flex
          numberOfLines={1}
          title={title}
          type="h4"
        />
        {secondary ? (
          <NavButton
            icon={secondRightIcon}
            notLeft
            onPress={onSecondRightPress}
            testID="secondRightNav"
          />
        ) : null}
        <NavButton
          icon={rightIcon}
          notLeft
          onPress={onRightPress}
          testID="rightNav"
        />
      </View>
      <View
        style={{
          backgroundColor: colors.background.primaryA,
          height: 2,
          width: '100%',
          ...showShadow,
          zIndex: 1,
        }}
      />
    </>
  );
});
