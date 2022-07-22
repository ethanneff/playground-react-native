import React from 'react';
// eslint-disable-next-line no-restricted-imports
import { StyleSheet, View as Original, ViewProps } from 'react-native';

type Props = ViewProps & {
  flex?: boolean;
  row?: boolean;
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row' },
});

export const View = ({ flex, row, children, style, ...rest }: Props) => {
  const combinedStyles = [
    flex ? styles.flex : undefined,
    row ? styles.row : undefined,
    style,
  ];

  return (
    <Original
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      style={combinedStyles}
    >
      {children}
    </Original>
  );
};
