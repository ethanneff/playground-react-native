import {useNavigation} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {Screen, Text} from '../../../components';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';
import {GestureHandler} from './logic';

const minTouches = 2;
const title = `pinch or spread the screen with ${minTouches} fingers minimum`;

export const PinchSpread = memo(function PinchSpread() {
  const [state, setState] = useState({pinchCount: 0, spreadCount: 0});
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    container: {backgroundColor: color.background.secondary, flex: 1},
  });
  const gestureHandler = new GestureHandler({minTouches});
  const panGesture = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: event => gestureHandler.onPanResponderMove(event),
    onPanResponderRelease: () => {
      const outcome = gestureHandler.onPanResponderRelease();
      if (outcome.spread)
        setState(prev => ({...prev, spreadCount: prev.spreadCount++}));

      if (outcome.pinch)
        setState(prev => ({...prev, pinchCount: prev.pinchCount++}));
    },
  });

  return (
    <Screen dropShadow onLeftPress={goBack} title="Pinch Spread">
      <Animated.View style={styles.container} {...panGesture.panHandlers} />
      <View style={{padding: padding(2)}}>
        <Text center title={title} />
        <Text center title={`spread: ${state.spreadCount}`} />
        <Text center title={`pinch: ${state.pinchCount}`} />
      </View>
    </Screen>
  );
});
