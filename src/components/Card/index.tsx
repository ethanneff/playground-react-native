import React, { memo, ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { View } from '../../components';
import { spacing, useColors, useDropShadow } from '../../features';
import { TouchableOpacity } from '../TouchableOpacity';

type Props = {
  borderRadius?: number;
  borderWidth?: number;
  children?: ReactNode | ReactNode[];
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  elevation?: number;
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
const touchOpacity = 0.3;

export const Card = memo(function Card({
  testID,
  borderRadius = spacing(2),
  borderWidth = 1,
  children,
  elevation = 0,
  onLongPress,
  onPress,
  containerStyle,
  contentStyle,
}: Props) {
  const colors = useColors();
  const dropShadow = useDropShadow();
  const shadow = elevation ? dropShadow(elevation) : {};
  const opacity = getOpacity(elevation);
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: colors.background.primaryA,
      borderColor: colors.background.primaryA,
      borderRadius,
      borderWidth,
      marginVertical: spacing(2),
      ...shadow,
    },
    contents: {
      backgroundColor: `hsla(0,0%,100%,${opacity})`,
      borderRadius,
      padding: spacing(4),
    },
  });

  const containerStyles = [styles.containerStyle, containerStyle];
  const contentStyles = [styles.contents, contentStyle];

  return onPress || onLongPress ? (
    <TouchableOpacity
      activeOpacity={onPress ? touchOpacity : 1}
      onLongPress={onLongPress}
      onPress={onPress}
      style={containerStyles}
      testID={testID}
    >
      <View style={contentStyles}>{children}</View>
    </TouchableOpacity>
  ) : (
    <View
      style={containerStyles}
      testID={testID}
    >
      <View style={contentStyles}>{children}</View>
    </View>
  );
});
