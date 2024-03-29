import React from 'react';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

type Properties = {
  readonly strokeWidth: number;
};

export const Shadow = ({ strokeWidth }: Properties) => {
  const center = strokeWidth / 2;
  return (
    <Svg
      height={strokeWidth}
      width={strokeWidth}
    >
      <Defs>
        <RadialGradient
          cx="50%"
          cy="50%"
          fx="50%"
          fy="50%"
          id="shadow"
          r="50%"
        >
          <Stop
            offset="0%"
            stopOpacity={0}
          />
          <Stop
            offset="90%"
            stopColor="black"
            stopOpacity={0.4}
          />
          <Stop
            offset="100%"
            stopColor="black"
            stopOpacity={0}
          />
        </RadialGradient>
      </Defs>
      <Circle
        cx={center}
        cy={center}
        fill="url(#shadow)"
        r={center}
      />
    </Svg>
  );
};
