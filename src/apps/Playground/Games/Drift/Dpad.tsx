import React, { memo, useCallback, useContext } from 'react';
import { Pressable, View } from '../../../../components';
import { useColors, useDropShadow } from '../../../../features';
import { DriftContext } from './Context';
import { type ColorChoice } from './types';

export const Dpad = memo(function Dpad() {
  const useShadow = useDropShadow();
  const { dispatch } = useContext(DriftContext);
  const colors = useColors();
  const size = 50;
  const box = {
    height: size,
    width: size,
  };

  const onPress = useCallback(
    (payload: ColorChoice) => () => {
      dispatch({ payload, type: 'addColor' });
    },
    [dispatch],
  );

  return (
    <View
      style={{
        bottom: size,
        position: 'absolute',
        right: size,
        transform: [{ rotate: '45deg' }],
      }}
    >
      <View flexDirection="row">
        <Pressable
          containerStyle={{
            ...box,
            backgroundColor: colors.background.warning,
            borderTopLeftRadius: size,
            ...useShadow(10),
          }}
          onPress={onPress('violet')}
        />
        <Pressable
          containerStyle={{
            ...box,
            backgroundColor: colors.background.positive,
            borderTopRightRadius: size,
            ...useShadow(10),
          }}
          onPress={onPress('mediumseagreen')}
        />
      </View>
      <View flexDirection="row">
        <Pressable
          containerStyle={{
            ...box,
            backgroundColor: colors.background.accent,
            borderBottomLeftRadius: size,
            ...useShadow(10),
          }}
          onPress={onPress('slateblue')}
        />
        <Pressable
          containerStyle={{
            ...box,
            backgroundColor: colors.background.negative,
            borderBottomRightRadius: size,
            ...useShadow(10),
          }}
          onPress={onPress('orange')}
        />
      </View>
    </View>
  );
});
