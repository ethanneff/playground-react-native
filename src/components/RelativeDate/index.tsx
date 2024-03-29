import { format as formatDate, formatDistance } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { type ViewStyle } from 'react-native';
import { type FontEmphasis, type FontType } from '../../features';
import { Pressable } from '../Pressable';
import { Text } from '../Text';

type Properties = {
  readonly date: number;
  readonly emphasis?: FontEmphasis;
  readonly format?: string;
  readonly style?: ViewStyle;
  readonly type?: FontType;
};

const minute = 60 * 1000;
export const RelativeDate = ({
  date,
  emphasis,
  format = 'MMM dd, yyyy h:mm a',
  style,
  type,
}: Properties) => {
  const [showRelativeDate, setShowRelativeDate] = useState(true);
  const [update, setUpdate] = useState(1);
  const text =
    showRelativeDate && update
      ? formatDistance(date, new Date(), { addSuffix: true })
      : formatDate(date, format);

  const toggleRelativeDate = useCallback(() => {
    setShowRelativeDate((previous) => !previous);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate((previous) => previous + 1);
    }, minute);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Pressable
      containerStyle={style}
      onPress={toggleRelativeDate}
    >
      <Text
        emphasis={emphasis}
        title={text}
        type={type}
      />
    </Pressable>
  );
};
