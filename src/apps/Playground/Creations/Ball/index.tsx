import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Button, Screen, View } from '../../../../components';
import { spacing, useColors, useDriver, useLayout } from '../../../../features';

const getBoundedRandom = (min: number, max: number) => {
  const random = Math.random() * (max - min) + min;
  return Math.min(max, Math.max(min, random));
};

const size = spacing(8);
export const Ball = memo(function PlaygroundBall() {
  const { layout, onLayout } = useLayout();
  const { goBack } = useNavigation();
  const ballPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const useNativeDriver = useDriver();
  const colors = useColors();

  const styles = StyleSheet.create({
    ball: {
      borderRadius: size,
      borderWidth: size,
      height: size * 2,
      position: 'absolute',
      width: size * 2,
    },
  });

  useEffect(() => {
    if (!layout) return;
    ballPosition.current.setValue({
      x: layout.width / 2 - size,
      y: layout.height / 2 - size,
    });
  }, [layout]);

  const animate = useCallback(
    (x: number, y: number) => {
      Animated.spring(ballPosition.current, {
        toValue: { x, y },
        useNativeDriver,
      }).start();
    },
    [ballPosition, useNativeDriver],
  );

  const onInitialPress = useCallback(() => {
    if (!layout) return;
    animate(layout.width / 2 - size, layout.height / 2 - size);
  }, [animate, layout]);

  const onRandomPress = useCallback(() => {
    if (!layout) return;
    const x = getBoundedRandom(0, layout.width - size * 2);
    const y = getBoundedRandom(0, layout.height - size * 2);

    animate(x, y);
  }, [animate, layout]);

  return (
    <Screen
      dropShadow
      onLayout={onLayout}
      onLeftPress={goBack}
      style={{ backgroundColor: colors.background.secondary }}
      testID="ballScreen"
      title="Ball"
    >
      <View
        flexDirection="row"
        justifyContent="space-around"
      >
        <Button
          onPress={onInitialPress}
          testID="initialButton"
          title="initial"
        />
        <Button
          onPress={onRandomPress}
          testID="randomButton"
          title="random"
        />
      </View>
      <Animated.View
        style={[ballPosition.current.getLayout(), styles.ball]}
        testID="ball"
      />
    </Screen>
  );
});
