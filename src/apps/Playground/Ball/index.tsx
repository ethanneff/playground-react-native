import React, {memo, useCallback} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Button, Screen} from '../../../components';
import {getHeight, getWidth} from '../../../models';
import {useColor, useNativeDriver, useNav} from '../../../hooks';
import {useRootSelector} from '../../../utils';

export default memo(function PlaygroundBall() {
  const height = useRootSelector(getHeight);
  const width = useRootSelector(getWidth);
  const nav = useNav();
  const ballPosition = new Animated.ValueXY({x: width / 2, y: height / 2});
  const useDriver = useNativeDriver();
  const color = useColor();
  const styles = StyleSheet.create({
    ball: {
      borderColor: color.text,
      borderRadius: 30,
      borderWidth: 30,
      height: 60,
      marginLeft: -30,
      marginTop: -30,
      width: 60,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
  const animate = useCallback(
    (dx: number, dy: number) => {
      Animated.spring(ballPosition, {
        toValue: {x: width * dx, y: height * dy},
        useNativeDriver: useDriver,
      }).start();
    },
    [ballPosition, height, useDriver, width],
  );
  const onInitialPress = useCallback(() => animate(0.5, 0.5), [animate]);
  const onRandomPress = useCallback(
    () => animate(Math.random(), Math.random()),
    [animate],
  );
  return (
    <Screen onLeftPress={nav.to('playground')} title="Ball">
      <Animated.View style={[ballPosition.getLayout(), styles.ball]} />
      <View style={styles.button}>
        <Button onPress={onInitialPress} title="initial" />
        <Button onPress={onRandomPress} title="random" />
      </View>
    </Screen>
  );
});
