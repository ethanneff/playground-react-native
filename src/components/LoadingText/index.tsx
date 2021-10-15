import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { v4 } from 'uuid';
import { Text } from '../Text';

type Props = {
  title: string;
  center?: boolean;
  style?: ViewStyle;
};

const ellipsis = ['', '.', '.', '.'];
const ellipsisDuration = 400;
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export const LoadingText = memo(function LoadingText({
  title,
  center,
  style,
}: Props) {
  const containerStyles = [
    styles.row,
    center ? styles.center : undefined,
    style,
  ];
  const ellipsisCountdown = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ellipsisIndex, setEllipsisIndex] = useState(1);

  const animateTextNextIndex = (index: number) =>
    index >= ellipsis.length - 1 ? 0 : index + 1;

  const animateText = useCallback(() => {
    ellipsisCountdown.current = setTimeout(() => {
      setEllipsisIndex((index) => animateTextNextIndex(index));
      animateText();
    }, ellipsisDuration);
  }, [ellipsisCountdown]);

  useEffect(() => {
    animateText();
    return () => {
      if (ellipsisCountdown.current) clearTimeout(ellipsisCountdown.current);
    };
  }, [animateText, ellipsisCountdown]);

  return (
    <View style={containerStyles}>
      <Text bold center title={title} type="h3" />
      {ellipsis.map((dot, index) => (
        <Text
          bold
          center
          invisible={index > ellipsisIndex}
          key={v4()}
          title={dot}
          type="h3"
        />
      ))}
    </View>
  );
});
