import { formatDistance } from 'date-fns';
import formatDate from 'date-fns/format';
import React, { useCallback, useEffect, useState } from 'react';
import { type ViewStyle } from 'react-native';
import { type FontEmphasis, type FontType } from '../../features';
import { Pressable } from '../Pressable';
import { Text } from '../Text';

type Props = {
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
}: Props) => {
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
};
