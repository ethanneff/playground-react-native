import React, { memo } from 'react';
import { View } from 'react-native';
import { Item } from './Item';

type Props = {
  buttons: string[];
  horizontal?: boolean;
  onChange: (id: string) => () => void;
  value: string;
};

export const Radio = memo(function Radio({
  buttons,
  value,
  onChange,
  horizontal,
}: Props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: horizontal ? 'row' : 'column',
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
