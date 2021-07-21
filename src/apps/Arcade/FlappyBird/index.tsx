import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useDriver} from '../../../hooks';

const Bird = () => {
  const color = useColor();
  return (
    <Animated.View
      style={{
        backgroundColor: color.background.negative,
        width: 50,
        height: 50,
      }}
    />
  );
};

const Pillar = () => {
  const color = useColor();
  const useNativeDriver = useDriver();
  const location = useRef(new Animated.ValueXY({x: 0, y: 0}));
  const state = useRef({x: 0, y: 0, direction: 1});

  useEffect(() => {
    const interval = setInterval(() => {
      const {y, direction} = state.current;
      state.current.y = y + 1 * direction;
      Animated.spring(location.current, {
        toValue: state.current,
        useNativeDriver,
      }).start();
    }, 20);
    return () => {
      clearInterval(interval);
    };
  }, [useNativeDriver, location]);

  const onPress = useCallback(() => {
    state.current.direction = -1;
  }, []);

  return (
    <Animated.View
      onTouchStart={onPress}
      style={[
        location.current.getLayout(),
        {
          backgroundColor: color.background.positive,
          width: 50,
          height: 50,
        },
      ]}
    />
  );
};

export const FlappyBird = memo(function FlappyBird() {
  const color = useColor();
  const {goBack} = useNavigation();

  return (
    <Screen onLeftPress={goBack} title="Flappy Bird">
      <View style={{flex: 1, backgroundColor: color.background.secondary}}>
        <Bird />
        <Pillar />
      </View>
    </Screen>
  );
});
