import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useDriver, useDropShadow} from '../../../features';

type PapiProps = {size: number};

const Papi = memo(function PapiMemo({size}: PapiProps) {
  const color = useColor();
  const dropShadow = useDropShadow();
  const useNativeDriver = useDriver();
  const location = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  useEffect(() => {
    const toValue = {x: 300, y: 600};
    Animated.timing(location, {
      toValue,
      duration: 3000,
      easing: Easing.bounce,
      useNativeDriver,
    }).start();
  }, [location, useNativeDriver]);

  return (
    <Animated.View
      style={[
        location.getLayout(),
        {
          height: size,
          width: size,
          borderRadius: size,
          backgroundColor: color.background.positive,
          ...dropShadow(5),
        },
      ]}
    />
  );
});

export const PapiJump = memo(function PapiJump() {
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.secondary,
      flex: 1,
    },
  });

  return (
    <Screen onLeftPress={goBack} title="Papi Jump">
      <View style={styles.container}>
        <Papi size={50} />
      </View>
    </Screen>
  );
});
