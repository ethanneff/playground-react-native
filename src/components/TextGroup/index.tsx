import React, { type ReactNode } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  Text as OriginalText,
  type StyleProp,
  type TextStyle,
} from 'react-native';

type Properties = {
  readonly children: ReactNode | ReactNode[];
  readonly style: StyleProp<TextStyle>;
};

export const TextGroup = ({ children, style }: Properties) => (
  <OriginalText style={style}>{children}</OriginalText>
);
