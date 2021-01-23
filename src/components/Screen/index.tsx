import React, {memo, ReactNode} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {config} from '../../utils';
import {NavBar} from './NavBar';

interface OwnProps {
  title?: string;
  testID?: string;
  border?: boolean;
  gutter?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?(): void;
  onRightPress?(): void;
  secondLeftIcon?: string;
  secondRightIcon?: string;
  onSecondLeftPress?(): void;
  onSecondRightPress?(): void;
  children?: ReactNode;
  dropShadow?: boolean;
}

type Props = OwnProps;

export const Screen = memo(function Screen({
  title,
  gutter,
  border,
  onLeftPress,
  onRightPress,
  children,
  leftIcon,
  rightIcon,
  secondLeftIcon,
  secondRightIcon,
  onSecondLeftPress,
  onSecondRightPress,
  testID,
  dropShadow,
}: Props) {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      flex: 1,
    },
    gutter: {
      backgroundColor: color.background,
      flex: 1,
      padding: gutter ? config.padding(4) : config.padding(0),
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
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
        <View style={styles.gutter} testID={testID}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
});
