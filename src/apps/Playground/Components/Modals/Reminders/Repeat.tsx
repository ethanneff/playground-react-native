import React, { useState } from 'react';
import { Item } from './Item';

type RepeatType = 'Daily' | 'Monthly' | 'Weekly' | 'Yearly';

export const Repeat = () => {
  const [active, setActive] = useState<RepeatType>('Daily');
  const onPress = (type: RepeatType) => () => {
    setActive(type);
  };

  const items: RepeatType[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  return (
    <>
      {items.map((item, index) => (
        <Item
          active={item === active}
          key={item}
          marginBottom={index !== items.length - 1}
          onPress={onPress(item)}
          title={item}
        />
      ))}
    </>
  );
};
