import React, { memo } from 'react';
import { View } from '../../../../../components';
import { Item } from './Item';
import { ReminderType } from './types';

type Props = {
  buttons: ReminderType[];
  horizontal?: boolean;
  onChange: (id: ReminderType) => () => void;
  value: ReminderType;
};

export const Radio = memo(function Radio({
  buttons,
  horizontal,
  onChange,
  value,
}: Props) {
  return (
    <View
      style={{
        flexDirection: horizontal ? 'row' : 'column',
        justifyContent: 'center',
      }}
    >
      {buttons.map((button, index) => (
        <Item
          active={button === value}
          key={button}
          marginBottom={index !== buttons.length - 1}
          onPress={onChange(button)}
          title={button}
        />
      ))}
    </View>
  );
});
