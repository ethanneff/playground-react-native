import React, {ReactNode} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';
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
  children?: ReactNode;
}

type Props = OwnProps;

export const Screen = ({
  title,
  gutter,
  border,
  onLeftPress,
  onRightPress,
  children,
  leftIcon,
  rightIcon,
  testID,
}: Props): JSX.Element => {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    gutter: {
      backgroundColor: color.background,
      flex: 1,
      padding: gutter ? Theme.padding.p04 : Theme.padding.p00,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle={color.statusBar} />
        <NavBar
          border={border}
          leftIcon={leftIcon}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          rightIcon={rightIcon}
          title={title}
        />
        <View style={styles.gutter} testID={testID}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};
