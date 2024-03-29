import React, { useState } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';
import { Screen, Text, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors, useDropShadow } from '../../../../features';
import { GestureHandler } from './logic';

const minTouches = 2;
const title = `pinch or spread the screen with ${minTouches} fingers minimum`;

export const PinchSpread = () => {
  const [state, setState] = useState({ pinchCount: 0, spreadCount: 0 });
  const colors = useColors();
  const { goBack } = useNavigation();
  const styles = StyleSheet.create({
    container: { backgroundColor: colors.background.secondary, flex: 1 },
  });

  const dropShadow = useDropShadow();

  const gestureHandler = new GestureHandler({ minTouches });
  const panGesture = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event) => {
      gestureHandler.onPanResponderMove(event);
    },
    onPanResponderRelease: () => {
      const outcome = gestureHandler.onPanResponderRelease();
      if (outcome.spread)
        setState((previous) => ({
          ...previous,
          spreadCount: previous.spreadCount++,
        }));

      if (outcome.pinch)
        setState((previous) => ({
          ...previous,
          pinchCount: previous.pinchCount++,
        }));
    },
  });

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Pinch Spread"
    >
      <Animated.View
        style={styles.container}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...panGesture.panHandlers}
      />
      <View
        style={{
          padding: spacing(2),
          ...dropShadow(0, -2),
          backgroundColor: colors.background.primaryA,
        }}
      >
        <Text
          center
          title={title}
        />
        <Text
          center
          title={`spread: ${state.spreadCount}`}
        />
        <Text
          center
          title={`pinch: ${state.pinchCount}`}
        />
      </View>
    </Screen>
  );
};
