import React, { memo, useCallback, useContext } from 'react';
import { TouchableOpacity, View } from '../../../../components';
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
        <TouchableOpacity
          onPress={onPress('violet')}
          style={{
            ...box,
            backgroundColor: colors.background.warning,
            borderTopLeftRadius: size,
            ...useShadow(10),
          }}
        />
        <TouchableOpacity
          onPress={onPress('mediumseagreen')}
          style={{
            ...box,
            backgroundColor: colors.background.positive,
            borderTopRightRadius: size,
            ...useShadow(10),
          }}
        />
      </View>
      <View flexDirection="row">
        <TouchableOpacity
          onPress={onPress('slateblue')}
          style={{
            ...box,
            backgroundColor: colors.background.accent,
            borderBottomLeftRadius: size,
            ...useShadow(10),
          }}
        />
        <TouchableOpacity
          onPress={onPress('orange')}
          style={{
            ...box,
            backgroundColor: colors.background.negative,
            borderBottomRightRadius: size,
            ...useShadow(10),
          }}
        />
      </View>
    </View>
  );
});
