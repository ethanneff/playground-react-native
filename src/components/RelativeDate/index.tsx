import { formatDistance } from 'date-fns';
import formatDate from 'date-fns/format';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { type ViewStyle } from 'react-native';
import { type FontEmphasis, type FontType } from '../../features';
import { Pressable } from '../Pressable';
import { Text } from '../Text';

type Props = {
  date: number;
  emphasis?: FontEmphasis;
  format?: string;
  style?: ViewStyle;
  type?: FontType;
};

const minute = 60 * 1000;
export const RelativeDate = memo(function RelativeDate({
  date,
  emphasis,
  format = 'MMM dd, yyyy h:mm a',
  style,
  type,
}: Props) {
  const [showRelativeDate, setShowRelativeDate] = useState(true);
  const [update, setUpdate] = useState(1);
  const text =
    showRelativeDate && update
      ? formatDistance(date, new Date(), { addSuffix: true })
      : formatDate(date, format);

  const toggleRelativeDate = useCallback(() => {
    setShowRelativeDate((prev) => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate((prev) => prev + 1);
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
});
