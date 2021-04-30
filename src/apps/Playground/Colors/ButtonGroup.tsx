import React, {memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from '../../../components';
import {ButtonEmphasis} from '../../../components/Button/types';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';

type ButtonGroupProps = {
  emphasis: ButtonEmphasis;
};

export const ButtonGroup = memo(function ButtonGroup({
  emphasis,
}: ButtonGroupProps) {
  const color = useColor();
  return (
    <View style={{flex: 1}}>
      <Text
        bold
        center
        style={{paddingBottom: config.padding(10)}}
        title={emphasis}
        type="h6"
      />
      {Object.keys(color).map((c: any) =>
        c === 'statusBar' ? null : (
          <Button center color={c} emphasis={emphasis} key={c} title={c} />
        ),
      )}
      <Button center disable emphasis={emphasis} title="disable" />
      <Button
        center
        dropShadow
        elevation={10}
        emphasis={emphasis}
        title="drop shadow"
      />
    </View>
  );
});
