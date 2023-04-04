import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { type ViewStyle } from 'react-native';
import { type FontEmphasis, type FontType } from '../../features';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
dayjs.extend(relativeTime);

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
  format = 'MMM D YYYY, h:mm a',
  style,
  type,
}: Props) {
  const [showRelativeDate, setShowRelativeDate] = useState(true);
  const [update, setUpdate] = useState(1);
  const text =
    showRelativeDate && update
      ? dayjs(date).fromNow()
      : dayjs(date).format(format);

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
