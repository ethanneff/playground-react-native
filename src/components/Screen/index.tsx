import React, { memo, type ReactNode } from 'react';
import {
  type LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { View } from '../../components';
import { useColors } from '../../features';
import { type IconName } from '../Icon';
import { NavBar } from './NavBar';

type Props = {
  border?: boolean;
  children?: ReactNode;
  dropShadow?: boolean;
  edges?: Edge[];
  leftIcon?: IconName;
  onLayout?: (event: LayoutChangeEvent) => void;
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
  border,
  children,
  dropShadow,
  edges = ['top', 'left', 'right', 'bottom'],
  leftIcon,
  onLayout,
  onLeftPress,
  onRightPress,
  onSecondLeftPress,
  onSecondRightPress,
  rightIcon,
  secondLeftIcon,
  secondRightIcon,
  style,
  testID,
  title,
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
          onLayout={onLayout}
          style={[styles.flex, style]}
          testID={testID}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
});
