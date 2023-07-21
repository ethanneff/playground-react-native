import React, { type ReactNode } from 'react';
import {
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { spacing, useColors, useDropShadow } from '../../features';
import { useAppSelector } from '../../redux';
import { Pressable } from '../Pressable';

type Props = {
  readonly children?: ReactNode | ReactNode[];
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly contentStyle?: StyleProp<ViewStyle>;
  readonly elevation?: number;
  readonly noFlex?: boolean;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly onLongPress?: () => void;
  readonly onPress?: () => void;
  readonly testID?: string;
};

const getOpacity = (elevation: number) =>
  elevation === 0
    ? 0
    : elevation === 1
    ? 0.05
    : ((elevation - 2) * 0.01 + 0.07).toFixed(2);

export const Card = ({
  children,
  containerStyle,
  contentStyle,
  elevation = 4,
  noFlex,
  onLayout,
  onLongPress,
  onPress,
  testID,
}: Props) => {
  const colors = useColors();
  const dropShadow = useDropShadow();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const shadow = elevation ? dropShadow(elevation) : {};
  const opacity = getOpacity(elevation);
  const styles = StyleSheet.create({
    container: {
      flex: noFlex ? 0 : 1,
    },
    content: {
      backgroundColor:
        currentTheme === 'light'
          ? colors.background.primaryA
          : `hsla(0,0%,100%,${opacity})`,
      borderColor: colors.background.primaryA,
      borderRadius: spacing(2),
      borderWidth: 1,
      flex: noFlex ? 0 : 1,
      padding: spacing(2),
      ...shadow,
    },
  });

  const contentStyles = [styles.content, contentStyle];
  const containerStyles = [styles.container, containerStyle];
  const hasPress = Boolean(onPress) || Boolean(onLongPress);

  return (
    <Pressable
      accessible={hasPress}
      containerStyle={containerStyles}
      contentStyle={contentStyles}
      onLayout={onLayout}
      onLongPress={onLongPress}
      onPress={onPress}
      testID={testID}
      withoutFeedback={!hasPress}
    >
      {children}
    </Pressable>
  );
};
