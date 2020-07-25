import React, {memo, useCallback, useContext} from 'react';
import {View} from 'react-native';
import {useColor, useDropShadow} from '../../../hooks';
import {TouchableOpacity} from '../../../components';
import {DriftContext} from './Context';

export type ColorChoice =
  | 'slateblue'
  | 'orange'
  | 'mediumseagreen'
  | 'violet'
  | 'lightgrey';

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
            backgroundColor: color.info,
            borderTopLeftRadius: size,
            ...useShadow(10),
          }}
        />
        <TouchableOpacity
          onPress={onPress('mediumseagreen')}
          style={{
            ...box,
            backgroundColor: color.success,
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
            backgroundColor: color.primary,
            borderBottomLeftRadius: size,
            ...useShadow(10),
          }}
        />
        <TouchableOpacity
          onPress={onPress('orange')}
          style={{
            ...box,
            backgroundColor: color.warning,
            borderBottomRightRadius: size,
            ...useShadow(10),
          }}
        />
      </View>
    </View>
  );
});
