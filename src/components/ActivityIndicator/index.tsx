import React, {memo} from 'react';
import {ActivityIndicator as Original, StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';

export const ActivityIndicator = memo(function ActivityIndicator() {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Original color={color.dark} size="large" />
    </View>
  );
});
