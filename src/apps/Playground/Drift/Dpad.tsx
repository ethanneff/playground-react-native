import React, {memo, useCallback, useContext} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from '../../../components';
import {useColor, useDropShadow} from '../../../features';
import {DriftContext} from './Context';
import {ColorChoice} from './types';

export const Dpad = memo(function Dpad() {
  const useShadow = useDropShadow();
  const {dispatch} = useContext(DriftContext);
  const color = useColor();
  const size = 50;
  const box = {
    width: size,
    height: size,
  };

  const onPress = useCallback(
    (payload: ColorChoice) => () => dispatch({type: 'addColor', payload}),
    [dispatch],
  );

  return (
    <View
      style={{
        position: 'absolute',
        bottom: size,
        right: size,
        transform: [{rotate: '45deg'}],
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={onPress('violet')}
          style={{
            ...box,
            backgroundColor: color.background.warning,
            borderTopLeftRadius: size,
            ...useShadow(10),
          }}
        />
        <TouchableOpacity
          onPress={onPress('mediumseagreen')}
          style={{
            ...box,
            backgroundColor: color.background.positive,
            borderTopRightRadius: size,
            ...useShadow(10),
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={onPress('slateblue')}
          style={{
            ...box,
            backgroundColor: color.background.accent,
            borderBottomLeftRadius: size,
            ...useShadow(10),
          }}
        />
        <TouchableOpacity
          onPress={onPress('orange')}
          style={{
            ...box,
            backgroundColor: color.background.negative,
            borderBottomRightRadius: size,
            ...useShadow(10),
          }}
        />
      </View>
    </View>
  );
});
