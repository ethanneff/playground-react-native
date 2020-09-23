import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Animated, Dimensions, Easing, TouchableOpacity} from 'react-native';
import * as d3 from 'd3-shape';
import Svg, {G, Path, Polygon, Text} from 'react-native-svg';
import {useColor, useDriver, useDropShadow} from '../../../hooks';
import {getNewLocation, getWinnerIndex} from './utils';

type Segment = {
  value: string;
  display: string;
  color: string;
};

type Props = {
  size?: number;
  padAngle?: number;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderWidth?: number;
  fontSize?: number;
  innerRadius?: number;
  segments: Segment[];
  spinSpeed?: number;
  noBounce?: boolean;
  bounceSpeed?: number;
  minSpin?: number;
  maxSpin?: number;
  onComplete: (segment: Segment) => void;
};

export const Wheel = memo(
  ({
    size = Dimensions.get('screen').width,
    backgroundColor,
    textColor,
    fontSize = 24,
    segments,
    noBounce,
    padAngle = 0.02,
    innerRadius = 60,
    spinSpeed = 1000,
    bounceSpeed = 5000,
    minSpin = 3,
    maxSpin = 7,
    onComplete,
  }: Props) => {
    const color = useColor();
    const dropShadow = useDropShadow();
    const useNativeDriver = useDriver();
    const background = backgroundColor || color.background;
    const text = textColor || color.text;
    const radius = size / 2;
    const knobSize = size / 8;
    const knobOffset = knobSize * 0.6;
    const numOfSegments = segments.length;
    const angleOfSegment = 360 / numOfSegments;
    const angleOffset = angleOfSegment / 2;
    const spinning = useRef(false);
    const location = useRef(0);
    const angle = new Animated.Value(0);
    const yPosition = new Animated.Value(-1);
    const arcs = d3
      .pie()(segments.map(() => 1))
      .map((arc: any, index) => {
        const instance = d3
          .arc()
          .padAngle(padAngle)
          .outerRadius(radius)
          .innerRadius(innerRadius);
        return {
          path: instance(arc),
          centroid: instance.centroid(arc),
          segment: segments[index],
        };
      });

    const onSpinComplete = useCallback(() => {
      spinning.current = false;
      const winnerIndex = getWinnerIndex({
        location: location.current,
        numOfSegments,
        angleOfSegment,
      });
      onComplete(segments[winnerIndex]);
    }, [angleOfSegment, numOfSegments, onComplete, segments]);

    const spin = useCallback(() => {
      const newLocation = getNewLocation({
        minSpin,
        maxSpin,
        numOfSegments,
        location: location.current,
      });
      location.current = newLocation;
      spinning.current = true;
      Animated.timing(angle, {
        toValue: newLocation,
        duration: spinSpeed,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver,
      }).start(onSpinComplete);
    }, [
      angle,
      maxSpin,
      minSpin,
      numOfSegments,
      onSpinComplete,
      spinSpeed,
      useNativeDriver,
    ]);

    const onPress = useCallback(() => {
      if (spinning.current) {
        return;
      }
      spin();
    }, [spin]);

    const bounce = useCallback(
      (toValue: number) => {
        const config = {toValue, duration: bounceSpeed, useNativeDriver};
        Animated.timing(yPosition, config).start(() =>
          bounce(toValue === 1 ? -1 : 1),
        );
      },
      [bounceSpeed, useNativeDriver, yPosition],
    );

    useEffect(() => {
      if (noBounce) {
        return;
      }
      bounce(1);
    }, [bounce, noBounce]);

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: yPosition.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [-10, 0, -10],
                }),
              },
            ],
            backgroundColor: background,
            width: size,
            height: size,
            borderRadius: size,
            alignItems: 'center',
            marginTop: knobOffset,
            ...dropShadow(3),
          }}>
          <Svg
            style={{
              marginTop: -knobOffset,
              position: 'absolute',
              width: knobSize,
              height: knobSize,
              ...dropShadow(6),
            }}>
            <Polygon
              fill={color.light}
              points={`${knobSize / 2},0 ${knobSize * 0.85},${knobSize / 3} ${
                knobSize / 2
              },${knobSize} ${knobSize * 0.15},${knobSize / 3},`}
              stroke={color.secondary}
              strokeWidth={0.2}
            />
          </Svg>
          <Animated.View
            style={{
              width: size,
              height: size,
              transform: [
                {
                  rotate: angle.interpolate({
                    inputRange: [-360, 0, 360],
                    outputRange: ['-360deg', '0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <Svg
              style={{
                transform: [{rotate: `-${angleOffset}deg`}],
              }}>
              <G x={radius} y={radius}>
                {arcs.map((arc, i) => (
                  <G key={`arc-${i}`}>
                    <Path d={String(arc.path)} fill={arc.segment.color} />
                    <G
                      origin={`${arc.centroid}`}
                      rotation={(i * 360) / segments.length + angleOffset}>
                      <Text
                        fill={text}
                        fontSize={fontSize}
                        textAnchor="middle"
                        x={arc.centroid[0]}
                        y={arc.centroid[1] - knobOffset / 2}>
                        {arc.segment.display}
                      </Text>
                    </G>
                  </G>
                ))}
              </G>
            </Svg>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);
