import { scaleLinear, scaleTime } from 'd3-scale';
import * as shape from 'd3-shape';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface DataPoint {
  date: number;
  value: number;
}

interface GraphProps {
  data: DataPoint[];
  width: number;
  height: number;
}

const strokeWidth = 4;
const padding = strokeWidth / 2;
const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain),
];

export const Graph = ({
  data,
  width,
  height,
}: GraphProps): React.ReactElement => {
  const scaleX = scaleTime()
    .domain(getDomain(data.map((d) => d.date)))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map((d) => d.value)))
    .range([height - padding, padding]);
  const d: string = shape
    .line<DataPoint>()
    .x((p) => scaleX(p.date))
    .y((p) => scaleY(p.value))
    .curve(shape.curveBasis)(data) as string;
  return (
    <View style={{ width, height }}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="gradient" x1="50%" x2="50%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor="#cee3f9" />
            <Stop offset="80%" stopColor="#ddedfa" />
            <Stop offset="100%" stopColor="#feffff" />
          </LinearGradient>
        </Defs>
        <Path
          d={`${d}L ${width} ${height} L 0 ${height}`}
          fill="url(#gradient)"
        />
        <Path
          d={d}
          fill="transparent"
          stroke="#3977e3"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};
