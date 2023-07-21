import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components';
import { useColors, useDropShadow } from '../../features';
import { type IconName } from '../Icon';
import { Text } from '../Text';
import { NavButton } from './NavButton';

type Props = {
  readonly border?: boolean;
  readonly dropShadow?: boolean;
  readonly leftIcon?: IconName;
  readonly onLeftPress?: () => void;
  readonly onRightPress?: () => void;
  readonly onSecondLeftPress?: () => void;
  readonly onSecondRightPress?: () => void;
  readonly rightIcon?: IconName;
  readonly secondLeftIcon?: IconName;
  readonly secondRightIcon?: IconName;
  readonly title?: string;
};

export const NavBar = ({
  border,
  dropShadow,
  leftIcon = 'chevron-left',
  onLeftPress,
  onRightPress,
  onSecondLeftPress,
  onSecondRightPress,
  rightIcon = 'close',
  secondLeftIcon,
  secondRightIcon,
  title,
}: Props) => {
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
};
