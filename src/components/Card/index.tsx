import React, { memo, type ReactNode } from 'react';
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
  children?: ReactNode | ReactNode[];
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  elevation?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  onLongPress?: () => void;
  onPress?: () => void;
  testID?: string;
};

const getOpacity = (elevation: number) =>
  elevation === 0
    ? 0
    : elevation === 1
    ? 0.05
    : ((elevation - 2) * 0.01 + 0.07).toFixed(2);

export const Card = memo(function Card({
  children,
  containerStyle,
  contentStyle,
  elevation = 4,
  onLayout,
  onLongPress,
  onPress,
  testID,
}: Props) {
  const colors = useColors();
  const dropShadow = useDropShadow();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const shadow = elevation ? dropShadow(elevation) : {};
  const opacity = getOpacity(elevation);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      backgroundColor:
        currentTheme === 'light'
          ? colors.background.primaryA
          : `hsla(0,0%,100%,${opacity})`,
      borderColor: colors.background.primaryA,
      borderRadius: spacing(2),
      borderWidth: 1,
      flex: 1,
      padding: spacing(2),
      ...shadow,
    },
  });

  const contentStyles = [styles.content, contentStyle];
  const containerStyles = [styles.container, containerStyle];

  return (
    <Pressable
      containerStyle={containerStyles}
      contentStyle={contentStyles}
      onLayout={onLayout}
      onLongPress={onLongPress}
      onPress={onPress}
      testID={testID}
      withoutFeedback={!onPress && !onLongPress}
    >
      {children}
    </Pressable>
  );
});
