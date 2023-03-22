import React, { memo, type ReactNode } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
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
  nonFlex?: boolean;
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
  borderRadius = spacing(2),
  borderWidth = 1,
  children,
  containerStyle,
  contentStyle,
  elevation = 0,
  nonFlex,
  onLongPress,
  onPress,
  testID,
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
      flex: nonFlex ? 0 : 1,
      marginVertical: spacing(2),
      ...shadow,
    },
    contents: {
      backgroundColor: `hsla(0,0%,100%,${opacity})`,
      borderRadius,
      flex: nonFlex ? 0 : 1,
      padding: spacing(2),
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
