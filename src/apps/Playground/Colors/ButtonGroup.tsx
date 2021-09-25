import React, { memo } from 'react';
import { View } from 'react-native';
import { v4 } from 'uuid';
import { Button, Text } from '../../../components';
import {
  FontEmphasis,
  MonoMultiColor,
  padding,
  useColor,
} from '../../../features';

type ButtonGroupProps = {
  emphasis: FontEmphasis;
};

export const ButtonGroup = memo(function ButtonGroup({
  emphasis,
}: ButtonGroupProps) {
  const color = useColor();
  const keys = Object.keys(color.text) as Array<keyof MonoMultiColor>;
  return (
    <View style={{ flex: 1 }}>
      <Text
        center
        style={{ paddingBottom: padding(5) }}
        title={emphasis}
        type="h5"
      />
      {keys.map((c) => (
        <Button
          buttonStyle={{ margin: 4 }}
          center
          color={c}
          disabled={c === 'disabled'}
          emphasis={emphasis}
          key={v4()}
          title={c}
        />
      ))}
      {keys.map((c) => (
        <Button
          buttonStyle={{ margin: 4 }}
          center
          color={c}
          disabled={c === 'disabled'}
          dropShadow
          emphasis={emphasis}
          key={v4()}
          title={c}
        />
      ))}
    </View>
  );
});
