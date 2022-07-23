import React from 'react';
import { StyleSheet, View as Original, ViewProps } from 'react-native'; // eslint-disable-line no-restricted-imports

type Props = ViewProps & {
  center?: boolean;
  flex?: boolean;
  row?: boolean;
};

const styles = StyleSheet.create({
  center: { justifyContent: 'center' },
  flex: { flex: 1 },
  row: { flexDirection: 'row' },
});

export const View = ({
  flex,
  row,
  children,
  center,
  style,
  ...rest
}: Props) => {
  const combinedStyles = [
    flex ? styles.flex : undefined,
    row ? styles.row : undefined,
    center ? styles.center : undefined,
    style,
  ];

  return (
    <Original
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      style={combinedStyles}
    >
      {children}
    </Original>
  );
};
