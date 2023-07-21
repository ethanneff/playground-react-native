import React, { type ReactNode } from 'react';
import {
  StatusBar,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { View } from '../../components';
import { useColors } from '../../features';
import { type IconName } from '../Icon';
import { NavBar } from './NavBar';

type Props = {
  readonly border?: boolean;
  readonly children?: ReactNode;
  readonly dropShadow?: boolean;
  readonly edges?: Edge[];
  readonly leftIcon?: IconName;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly onLeftPress?: () => void;
  readonly onRightPress?: () => void;
  readonly onSecondLeftPress?: () => void;
  readonly onSecondRightPress?: () => void;
  readonly rightIcon?: IconName;
  readonly secondLeftIcon?: IconName;
  readonly secondRightIcon?: IconName;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
  readonly title?: string;
};

const defaultEdges: Edge[] = ['top', 'left', 'right', 'bottom'];

export const Screen = ({
  border,
  children,
  dropShadow,
  edges,
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
}: Props) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: { backgroundColor: colors.background.primaryA, flex: 1 },
  });

  return (
    <SafeAreaView
      edges={edges ?? defaultEdges}
      style={styles.container}
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
        flex={1}
        onLayout={onLayout}
        style={style}
        testID={testID}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
