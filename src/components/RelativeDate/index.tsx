import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import {FontEmphasis, FontType} from '../../features/Config';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';
dayjs.extend(relativeTime);

type Props = {
  date: number;
  type?: FontType;
  emphasis?: FontEmphasis;
  format?: string;
  style?: ViewStyle;
};

const minute = 60 * 1000;
export const RelativeDate = memo(function RelativeDate({
  date,
  type,
  emphasis,
  style,
  format = 'MMM D YYYY, h:mm a',
}: Props) {
  const [showRelativeDate, setShowRelativeDate] = useState(true);
  const [update, setUpdate] = useState(1);
  const text =
    showRelativeDate && update
      ? dayjs(date).fromNow()
      : dayjs(date).format(format);

  const toggleRelativeDate = useCallback(() => {
    setShowRelativeDate(prev => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setUpdate(prev => prev + 1), minute);
    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity onPress={toggleRelativeDate} style={style}>
      <Text emphasis={emphasis} title={text} type={type} />
    </TouchableOpacity>
  );
});
