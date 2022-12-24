import { scaleLinear, scaleTime } from 'd3-scale';
import { curveBasis, line } from 'd3-shape';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { View } from '../../../../components';

type DataPoint = {
  date: number;
  value: number;
};

type GraphProps = {
  data: DataPoint[];
  height: number;
  width: number;
};

const strokeWidth = 4;
const padding = strokeWidth / 2;
const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain),
];

export const Graph = ({ data, height, width }: GraphProps) => {
  const scaleX = scaleTime()
    .domain(getDomain(data.map((d) => d.date)))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map((d) => d.value)))
    .range([height - padding, padding]);
  const d: string | null = line<DataPoint>()
    .x((p) => scaleX(p.date))
    .y((p) => scaleY(p.value))
    .curve(curveBasis)(data);

  return d ? (
    <View style={{ height, width }}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient
            id="gradient"
            x1="50%"
            x2="50%"
            y1="0%"
            y2="100%"
          >
            <Stop
              offset="0%"
              stopColor="#cee3f9"
            />
            <Stop
              offset="80%"
              stopColor="#ddedfa"
            />
            <Stop
              offset="100%"
              stopColor="#feffff"
            />
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
  ) : null;
};
