import React from 'react';
import { View } from '../../../../../components';
import { Item } from './Item';
import { type ReminderType } from './types';

type Properties = {
  readonly buttons: ReminderType[];
  readonly horizontal?: boolean;
  readonly onChange: (id: ReminderType) => () => void;
  readonly value: ReminderType;
};

export const Radio = ({ buttons, horizontal, onChange, value }: Properties) => (
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
