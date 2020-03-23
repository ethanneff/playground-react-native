import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { Item } from './Item';

type RepeatType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export default memo(function Repeat() {
  const [active, setActive] = useState<RepeatType>('Daily');
  const onPress = (type: RepeatType) => () => setActive(type);

  const items: RepeatType[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  return (
    <View>
      {items.map((item, index) => {
        return (
          <Item
            active={item === active}
            title={item}
            key={item}
            onPress={onPress(item)}
            marginBottom={index !== items.length - 1}
          />
        );
      })}
    </View>
  );
});
