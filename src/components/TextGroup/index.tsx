import React, { type ReactNode } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  Text as OriginalText,
  type StyleProp,
  type TextStyle,
} from 'react-native';

type Props = {
  readonly children: ReactNode | ReactNode[];
  readonly style: StyleProp<TextStyle>;
};

export const TextGroup = ({ children, style }: Props) => (
  <OriginalText style={style}>{children}</OriginalText>
);
