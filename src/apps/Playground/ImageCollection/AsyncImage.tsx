import React from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {useDriver} from '../../../hooks';
interface Props {
  uri: string;
  height: number;
  width: number;
  color?: string;
  size?: number | 'small' | 'large';
}

export const AsyncImage = ({
  uri,
  height,
  width,
  color = 'black',
  size = 'small',
}: Props): JSX.Element => {
  const useNativeDriver = useDriver();
  const imageAnimated = new Animated.Value(0);
  const indicatorAnimated = new Animated.Value(1);
  const styles = StyleSheet.create({
    indicatorOverlay: {justifyContent: 'center', position: 'absolute'},
  });
  const onImageLoad = () => {
    Animated.parallel([
      Animated.timing(indicatorAnimated, {
        toValue: 0,
        useNativeDriver,
      }),
      Animated.timing(imageAnimated, {
        toValue: 1,
        useNativeDriver,
      }),
    ]).start();
  };

  const containerStyle = {width, height};
  const imageStyle = [containerStyle, {opacity: imageAnimated}];
  const indicatorStyle = [
    containerStyle,
    {opacity: indicatorAnimated},
    styles.indicatorOverlay,
  ];
  return (
    <View style={containerStyle}>
      <Animated.Image onLoad={onImageLoad} source={{uri}} style={imageStyle} />
      <Animated.View style={indicatorStyle}>
        <ActivityIndicator color={color} size={size} />
      </Animated.View>
    </View>
  );
};
