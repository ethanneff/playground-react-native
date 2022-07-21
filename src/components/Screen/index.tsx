import React, { memo, ReactNode } from 'react';
import { StatusBar, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../../components';
import { useColors } from '../../features';
import { IconName } from '../Icon';
import { NavBar } from './NavBar';

type Props = {
  border?: boolean;
  children?: ReactNode;
  dropShadow?: boolean;
  edges?: Edge[];
  leftIcon?: IconName;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onSecondLeftPress?: () => void;
  onSecondRightPress?: () => void;
  rightIcon?: IconName;
  secondLeftIcon?: IconName;
  secondRightIcon?: IconName;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  title?: string;
};

export const Screen = memo(function Screen({
  title,
  testID,
  border,
  style,
  edges = ['top', 'left', 'right', 'bottom'],
  onLeftPress,
  onRightPress,
  children,
  leftIcon,
  rightIcon,
  secondLeftIcon,
  secondRightIcon,
  onSecondLeftPress,
  onSecondRightPress,
  dropShadow,
}: Props) {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.primaryA,
      flex: 1,
    },
    flex: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView
        edges={edges}
        style={styles.flex}
      >
        <StatusBar barStyle={colors.statusBar} />
        <NavBar
          border={border}
          dropShadow={dropShadow}
          leftIcon={leftIcon}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          onSecondLeftPress={onSecondLeftPress}
          onSecondRightPress={onSecondRightPress}
          rightIcon={rightIcon}
          secondLeftIcon={secondLeftIcon}
          secondRightIcon={secondRightIcon}
          title={title}
        />
        <View
          style={[styles.flex, style]}
          testID={testID}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
});
