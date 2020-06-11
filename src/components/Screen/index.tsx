import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../utils';
import {KeyboardSpacer} from '../../conversions';
import {useColor} from '../../hooks';
import {NavBar} from './NavBar';

interface OwnProps {
  style?: ViewStyle;
  title?: string;
  border?: boolean;
  gutter?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?(): void;
  onRightPress?(): void;
}

type Props = OwnProps;

export const Screen: React.FC<Props> = ({
  title,
  style,
  gutter,
  border,
  onLeftPress,
  onRightPress,
  children,
  leftIcon,
  rightIcon,
}) => {
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
      padding: gutter ? Theme.padding.p04 : Theme.padding.p00,
    },
  });
  const childrenStyles = [styles.container, gutter && styles.gutter, style];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle={color.statusBar} />
        <NavBar
          border={border}
          title={title}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
        />
        <View style={childrenStyles}>{children}</View>
      </SafeAreaView>
      <KeyboardSpacer />
    </View>
  );
};
