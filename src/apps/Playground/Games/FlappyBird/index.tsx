import React, { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Screen, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors, useDriver } from '../../../../features';

const Bird = () => {
  const colors = useColors();
  return (
    <Animated.View
      style={{
        backgroundColor: colors.background.negative,
        height: 50,
        width: 50,
      }}
    />
  );
};

const Pillar = () => {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const location = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const state = useRef({ direction: 1, x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const { direction, y } = state.current;
      state.current.y = y + Number(direction);
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
          backgroundColor: colors.background.positive,
          height: 50,
          width: 50,
        },
      ]}
    />
  );
};

export const FlappyBird = () => {
  const colors = useColors();
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Flappy Bird"
    >
      <View style={{ backgroundColor: colors.background.secondary, flex: 1 }}>
        <Bird />
        <Pillar />
      </View>
    </Screen>
  );
};
