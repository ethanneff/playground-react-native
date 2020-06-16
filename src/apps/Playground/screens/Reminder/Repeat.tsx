import React, {memo, useState} from 'react';
import {Item} from './Item';

type RepeatType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export default memo(function Repeat() {
  const [active, setActive] = useState<RepeatType>('Daily');
  const onPress = (type: RepeatType) => () => setActive(type);

  const items: RepeatType[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  return (
    <>
      {items.map((item, index) => {
        return (
          <Item
            active={item === active}
            key={item}
            marginBottom={index !== items.length - 1}
            onPress={onPress(item)}
            title={item}
          />
        );
      })}
    </>
  );
});
