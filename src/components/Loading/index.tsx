import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from '../Text';

interface Props {
  title: string;
  center?: boolean;
  style?: ViewStyle;
}

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

export const Loading = memo(function Loading({title, center, style}: Props) {
  const containerStyles = [
    styles.row,
    center ? styles.center : undefined,
    style,
  ];
  // let ellipsisCountdown: NodeJS.Timer;
  const [ellipsisIndex, setEllipsisIndex] = useState(1);
  const animateTextNextIndex = (index: number) =>
    index >= ellipsis.length - 1 ? 0 : index + 1;
  const animateText = useCallback(() => {
    setTimeout(() => {
      setEllipsisIndex(index => animateTextNextIndex(index));
      animateText();
    }, ellipsisDuration);
  }, []);

  useEffect(() => {
    animateText();
    // return () => clearTimeout(ellipsisCountdown);
  }, [animateText]);

  return (
    <View style={containerStyles}>
      <Text bold center title={title} type="h3" />
      {ellipsis.map((dot, index) => (
        <Text
          bold
          center
          invisible={index > ellipsisIndex}
          key={index}
          title={dot}
          type="h3"
        />
      ))}
    </View>
  );
});
