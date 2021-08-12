import React, {memo} from 'react';
import {
  ActivityIndicator as Original,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useColor} from '../../features/Theme';

type Props = {
  size?: number | 'small' | 'large';
  style?: StyleProp<ViewStyle>;
};
export const ActivityIndicator = memo(function ActivityIndicator({
  size = 'large',
  style,
}: Props) {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.primaryA,
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Original color={color.text.secondary} size={size} />
    </View>
  );
});
