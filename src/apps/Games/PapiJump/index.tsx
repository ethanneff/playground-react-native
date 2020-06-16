import React, {memo, useEffect} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useDropShadow, useNativeDriver, useNav} from '../../../hooks';

type PapiProps = {size: number; color: string};

const Papi = memo(({size, color}: PapiProps) => {
  const dropShadow = useDropShadow(10);
  const useDriver = useNativeDriver();
  const location = new Animated.ValueXY({x: 0, y: 0});

  useEffect(() => {
    const toValue = {x: 300, y: 600};
    Animated.timing(location, {
      toValue,
      duration: 3000,
      easing: Easing.bounce,
      useNativeDriver: useDriver,
    }).start();
  }, [location, useDriver]);

  useEffect(() => {}, [location]);

  return (
    <Animated.View
      style={[
        location.getLayout(),
        {
          height: size,
          width: size,
          borderRadius: size,
          backgroundColor: color,
          ...dropShadow,
        },
      ]}
    />
  );
});

export default memo(function PapiJump() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.surface,
      flex: 1,
    },
  });
  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Papi Jump">
      <View style={styles.container}>
        <Papi size={50} color={color.primary} />
      </View>
    </Screen>
  );
});
