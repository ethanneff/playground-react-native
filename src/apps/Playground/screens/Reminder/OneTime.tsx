import dayjs, {Dayjs} from 'dayjs';
import React, {memo} from 'react';
import {Item} from './Item';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const generateButtons = () => {
  const laterToday = dayjs().add(3, 'hour').add(30, 'minute').set('minute', 0);

  const evening = dayjs().set('hour', 18).set('minute', 0);

  const tomorrow = dayjs().add(1, 'day').set('hour', 6).set('minute', 0);

  const nextWeek = dayjs()
    .add(1, 'week')
    .set('hour', 6)
    .set('minute', 0)
    .set('day', 1);

  const nextMonth = dayjs().add(2, 'month').set('hour', 6).set('minute', 0);

  const yesterday = dayjs().subtract(1, 'day');

  return [
    {
      title: 'Later today',
      description: laterToday.format('hh:mm A'),
      value: laterToday,
      visible: dayjs().set('hour', 18),
    },
    {
      title: 'This Evening',
      description: evening.format('hh:mm A'),
      value: evening,
      visible: dayjs().set('hour', 18),
    },
    {
      title: 'Tomorrow',
      description: `${daysOfWeek[tomorrow.day()]} ${tomorrow.format(
        'hh:mm A',
      )}`,
      value: tomorrow,
    },
    {
      title: 'Next Week',
      description: `${nextWeek.format('MMM DD, hh:mm A')}`,
      value: nextWeek,
    },
    {
      title: 'Someday',
      description: '',
      value: nextMonth,
    },
    {
      title: 'Custom',
      description: '',
      value: yesterday,
    },
  ];
};

interface Props {
  onPress: (value: Dayjs) => () => void;
}

export default memo(function OneTime({onPress}: Props) {
  const buttons = generateButtons();
  return (
    <>
      {buttons.map((button, index) => {
        const hidden =
          button.visible && dayjs().valueOf() > button.visible.valueOf();
        return (
          <Item
            description={button.description}
            hidden={hidden}
            icon="alarm"
            key={button.title}
            marginBottom={index !== buttons.length - 1}
            onPress={onPress(button.value)}
            title={button.title}
          />
        );
      })}
    </>
  );
});
