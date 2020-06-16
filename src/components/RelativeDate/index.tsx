import dayjs from 'dayjs';
import React, {memo, useEffect, useState} from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';
dayjs.extend(relativeTime);

interface Props {
  date: number;
}

const minute = 60 * 1000;
export const RelativeDate = memo(function RelativeDate({date}: Props) {
  const [showRelativeDate, setShowRelativeDate] = useState(true);
  const [update, setUpdate] = useState(1);

  const toggleRelativeDate = () => {
    setShowRelativeDate((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => setUpdate((prev) => prev + 1), minute);
    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity onPress={toggleRelativeDate}>
      {showRelativeDate && update ? (
        <Text title={dayjs(date).fromNow()} />
      ) : (
        <Text title={dayjs(date).format('MMM D YYYY, h:mm a')} />
      )}
    </TouchableOpacity>
  );
});
