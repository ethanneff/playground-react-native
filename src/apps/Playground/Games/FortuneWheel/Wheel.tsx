import { arc as d3Arc, pie } from 'd3-shape';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import Svg, { G, Path, Polygon, Text } from 'react-native-svg';
import { v4 } from 'uuid';
import { Pressable } from '../../../../components';
import { useColors, useDriver, useDropShadow } from '../../../../features';
import { type Segment } from './types';
import { getNewLocation, getWinnerIndex } from './utils';

type Props = {
  backgroundColor?: string;
  bounceSpeed?: number;
  fontSize?: number;
  innerRadius?: number;
  maxSpin?: number;
  minSpin?: number;
  noBounce?: boolean;
  onComplete: (segment: Segment) => void;
  padAngle?: number;
  segments: Segment[];
  size?: number;
  spinSpeed?: number;
  textColor?: string;
};

export const Wheel = memo(function WheelMemo({
  backgroundColor,
  bounceSpeed = 5000,
  fontSize = 24,
  innerRadius = 60,
  maxSpin = 7,
  minSpin = 3,
  noBounce,
  onComplete,
  padAngle = 0.02,
  segments,
  size = Dimensions.get('screen').width,
  spinSpeed = 1000,
  textColor,
}: Props) {
  const colors = useColors();
  const dropShadow = useDropShadow();
  const useNativeDriver = useDriver();
  const background = backgroundColor ?? colors.background.primaryA;
  const text = textColor ?? colors.text.primaryA;
  const radius = size / 2;
  const knobSize = size / 8;
  const knobOffset = knobSize * 0.6;
  const numOfSegments = segments.length;
  const angleOfSegment = 360 / numOfSegments;
  const angleOffset = angleOfSegment / 2;
  const spinning = useRef(false);
  const location = useRef(0);
  const angle = useRef(new Animated.Value(0)).current;
  const yPosition = useRef(new Animated.Value(-1)).current;
  const arcs = pie()(segments.map(() => 1)).map((arc, index) => {
    const instance = d3Arc()
      .padAngle(padAngle)
      .outerRadius(radius)
      .innerRadius(innerRadius);
    return {
      // @ts-expect-error Type 'PieArcDatum<number | { valueOf(): number; }>' is missing the following properties from type 'DefaultArcObject': innerRadius, outerRadius
      centroid: instance.centroid(arc),
      // @ts-expect-error Type 'PieArcDatum<number | { valueOf(): number; }>' is missing the following properties from type 'DefaultArcObject': innerRadius, outerRadius
      path: instance(arc),
      segment: segments[index],
    };
  });

  const onSpinComplete = useCallback(() => {
    spinning.current = false;
    const winnerIndex = getWinnerIndex({
      angleOfSegment,
      location: location.current,
      numOfSegments,
    });
    onComplete(segments[winnerIndex]);
  }, [angleOfSegment, numOfSegments, onComplete, segments]);

  const spin = useCallback(() => {
    const newLocation = getNewLocation({
      location: location.current,
      maxSpin,
      minSpin,
      numOfSegments,
    });
    location.current = newLocation;
    spinning.current = true;
    Animated.timing(angle, {
      duration: spinSpeed,
      easing: Easing.inOut(Easing.sin),
      toValue: newLocation,
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
    if (spinning.current) return;
    spin();
  }, [spin]);

  const bounce = useCallback(
    (toValue: number) => {
      const config = { duration: bounceSpeed, toValue, useNativeDriver };
      Animated.timing(yPosition, config).start(() => {
        bounce(toValue === 1 ? -1 : 1);
      });
    },
    [bounceSpeed, useNativeDriver, yPosition],
  );

  useEffect(() => {
    if (noBounce) return;

    bounce(1);
  }, [bounce, noBounce]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          alignItems: 'center',
          backgroundColor: background,
          borderRadius: size,
          height: size,
          marginTop: knobOffset,
          transform: [
            {
              translateY: yPosition.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-10, 0, -10],
              }),
            },
          ],
          width: size,
          ...dropShadow(3),
        }}
      >
        <Svg
          style={{
            height: knobSize,
            marginTop: -knobOffset,
            position: 'absolute',
            width: knobSize,
            ...dropShadow(6),
          }}
        >
          <Polygon
            fill={colors.background.tertiary}
            points={`${knobSize / 2},0 ${knobSize * 0.85},${knobSize / 3} ${
              knobSize / 2
            },${knobSize} ${knobSize * 0.15},${knobSize / 3},`}
            stroke={colors.background.secondary}
            strokeWidth={0.2}
          />
        </Svg>
        <Animated.View
          style={{
            height: size,
            transform: [
              {
                rotate: angle.interpolate({
                  inputRange: [-360, 0, 360],
                  outputRange: ['-360deg', '0deg', '360deg'],
                }),
              },
            ],
            width: size,
          }}
        >
          <Svg
            style={{
              transform: [{ rotate: `-${angleOffset}deg` }],
            }}
          >
            <G
              x={radius}
              y={radius}
            >
              {arcs.map((arc, i) => (
                <G key={v4()}>
                  <Path
                    d={String(arc.path)}
                    fill={arc.segment.color}
                  />
                  <G
                    origin={arc.centroid.toString()}
                    rotation={(i * 360) / segments.length + angleOffset}
                  >
                    <Text
                      fill={text}
                      fontSize={fontSize}
                      textAnchor="middle"
                      x={arc.centroid[0]}
                      y={arc.centroid[1] - knobOffset / 2}
                    >
                      {arc.segment.display}
                    </Text>
                  </G>
                </G>
              ))}
            </G>
          </Svg>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});
