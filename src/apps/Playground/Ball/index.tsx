import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Button, Screen} from '../../../components';
import {padding, useColor, useDriver} from '../../../features';
import {getHeight, getWidth, useRootSelector} from '../../../redux';

export const Ball = memo(function PlaygroundBall() {
  const height = useRootSelector(getHeight);
  const width = useRootSelector(getWidth);
  const {goBack} = useNavigation();
  const ballPosition = useRef(
    new Animated.ValueXY({x: width / 2, y: height / 2}),
  ).current;
  const useNativeDriver = useDriver();
  const color = useColor();
  const size = padding(8);
  const styles = StyleSheet.create({
    ball: {
      borderRadius: size,
      borderWidth: size,
      height: size * 2,
      marginLeft: -size,
      marginTop: -size,
      width: size * 2,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
  const animate = useCallback(
    (dx: number, dy: number) => {
      Animated.spring(ballPosition, {
        toValue: {x: width * dx, y: height * dy},
        useNativeDriver,
      }).start();
    },
    [ballPosition, height, useNativeDriver, width],
  );
  const onInitialPress = useCallback(() => animate(0.5, 0.5), [animate]);
  const onRandomPress = useCallback(
    () => animate(Math.random(), Math.random()),
    [animate],
  );

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      style={{backgroundColor: color.background.secondary}}
      testID="ballScreen"
      title="Ball">
      <Animated.View
        style={[ballPosition.getLayout(), styles.ball]}
        testID="ball"
      />
      <View style={styles.buttons}>
        <Button
          onPress={onInitialPress}
          testID="initialButton"
          title="initial"
        />
        <Button onPress={onRandomPress} testID="randomButton" title="random" />
      </View>
    </Screen>
  );
});
