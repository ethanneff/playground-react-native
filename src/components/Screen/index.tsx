import React, {memo, ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useColor} from '../../hooks';
import {NavBar} from './NavBar';

type Props = {
  testID?: string;
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
  children?: ReactNode;
  dropShadow?: boolean;
  style?: StyleProp<ViewStyle>;
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
      backgroundColor: color.background,
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
