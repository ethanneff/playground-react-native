import React, { ReactNode } from 'react';
import { StyleProp, Text as OriginalText, TextStyle } from 'react-native'; // eslint-disable-line no-restricted-imports

type Props = {
  children: ReactNode | ReactNode[];
  style: StyleProp<TextStyle>;
};

export const TextGroup = ({ children, style }: Props) => {
  return <OriginalText style={style}>{children}</OriginalText>;
};
