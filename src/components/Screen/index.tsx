import React, { memo, ReactNode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useColor } from '../../features/Theme';
import { NavBar } from './NavBar';

type Props = {
  border?: boolean;
  children?: ReactNode;
  dropShadow?: boolean;
  leftIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onSecondLeftPress?: () => void;
  onSecondRightPress?: () => void;
  rightIcon?: string;
  secondLeftIcon?: string;
  secondRightIcon?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  title?: string;
};

export const Screen = memo(function Screen({
  title,
  testID,
  border,
  style,
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
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.primaryA,
      flex: 1,
    },
    flex: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle={color.statusBar} />
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
        <View style={[styles.flex, style]} testID={testID}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
});
