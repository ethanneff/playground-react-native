import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Animated, Dimensions, Easing, TouchableOpacity} from 'react-native';
import * as d3 from 'd3-shape';
import Svg, {G, Path, Text} from 'react-native-svg';
import {getNewLocation, getWinnerIndex} from './utils';

type Segment = {
  value: string;
  display: string;
  color: string;
};

type Props = {
  size?: number;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderWidth?: number;
  fontSize?: number;
  innerRadius?: number;
  segments: Segment[];
  spinSpeed?: number;
  bounceSpeed?: number;
  minSpin?: number;
  maxSpin?: number;
  onComplete: (segment: Segment) => void;
};

export const Wheel = memo(
  ({
    size = Dimensions.get('screen').width,
    backgroundColor = 'lightgrey',
    textColor = 'white',
    fontSize = 20,
    segments,
    innerRadius = 60,
    spinSpeed = 1000,
    bounceSpeed = 5000,
    minSpin = 1,
    maxSpin = 3,
    onComplete,
  }: Props) => {
    const radius = size / 2;
    const numOfSegments = segments.length;
    const angleOfSegment = 360 / numOfSegments;
    const angleOffset = angleOfSegment / 2;
    const active = useRef(false);
    const location = useRef(0);
    const angle = new Animated.Value(0);
    const yPosition = new Animated.Value(-1);
    const arcs = d3
      .pie()(segments.map(() => 1))
      .map((arc, index) => {
        const instance = d3
          .arc()
          .padAngle(0.01)
          .outerRadius(radius)
          .innerRadius(innerRadius);
        return {
          path: instance(arc),
          centroid: instance.centroid(arc),
          segment: segments[index],
        };
      });

    const onSpinComplete = useCallback(() => {
      active.current = false;
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
      active.current = true;
      Animated.timing(angle, {
        toValue: newLocation,
        duration: spinSpeed,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }).start(onSpinComplete);
    }, [angle, maxSpin, minSpin, numOfSegments, onSpinComplete, spinSpeed]);

    const onPress = useCallback(() => {
      if (active.current) {
        return;
      }
      spin();
    }, [spin]);

    const bounce = useCallback(
      (toValue: number) => {
        const config = {toValue, duration: bounceSpeed, useNativeDriver: true};
        Animated.timing(yPosition, config).start(() =>
          bounce(toValue === 1 ? -1 : 1),
        );
      },
      [bounceSpeed, yPosition],
    );

    useEffect(() => {
      bounce(1);
    }, [bounce]);

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: yPosition.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: ['-10', '0', '-10'],
                }),
              },
            ],
            backgroundColor,
            width: size,
            height: size,
            borderRadius: size,
          }}>
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
                    <Path
                      d={arc.path}
                      fill={arc.segment.color}
                      strokeWidth={2}
                    />
                    <G
                      origin={`${arc.centroid}`}
                      rotation={(i * 360) / segments.length + angleOffset}>
                      <Text
                        fill={textColor}
                        fontSize={fontSize}
                        textAnchor="middle"
                        x={arc.centroid[0]}
                        y={arc.centroid[1] - 50}>
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
