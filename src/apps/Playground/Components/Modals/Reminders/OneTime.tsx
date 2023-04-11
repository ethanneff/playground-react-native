import { add, format, set, startOfMonth, startOfWeek, sub } from 'date-fns';
import React, { memo } from 'react';
import { Item } from './Item';

const generateButtons = () => {
  const today = new Date();
  const laterToday = set(add(today, { minutes: 30 }), { hours: 3, minutes: 0 });
  const yesterday = sub(today, { days: 1 });
  const evening = set(today, { hours: 18, minutes: 0 });
  const tomorrow = set(add(today, { days: 1 }), { hours: 6, minutes: 0 });
  const nextWeek = set(startOfWeek(add(today, { weeks: 1 })), {
    hours: 6,
    minutes: 0,
  });
  const nextMonth = set(startOfMonth(add(today, { months: 2 })), {
    hours: 6,
    minutes: 0,
  });

  return [
    {
      description: format(laterToday, 'hh:mm A'),
      title: 'Later today',
      value: laterToday,
      visible: set(today, { hours: 2 }),
    },
    {
      description: format(evening, 'hh:mm A'),
      title: 'This Evening',
      value: evening,
      visible: set(today, { hours: 18 }),
    },
    {
      description: format(tomorrow, 'EEE, hh:mm A'),
      title: 'Tomorrow',
      value: tomorrow,
    },
    {
      description: `${format(nextWeek, 'MMM dd, hh:mm A')}`,
      title: 'Next Week',
      value: nextWeek,
    },
    {
      description: '',
      title: 'Someday',
      value: nextMonth,
    },
    {
      description: '',
      title: 'Custom',
      value: yesterday,
    },
  ];
};

type Props = {
  onPress: (value: Date) => () => void;
};

export const OneTime = memo(function OneTime({ onPress }: Props) {
  const buttons = generateButtons();
  const today = new Date().valueOf();
  return (
    <>
      {buttons.map((button, index) => {
        const hidden = button.visible && today > button.visible.valueOf();
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
