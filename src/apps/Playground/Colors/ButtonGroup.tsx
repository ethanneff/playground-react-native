import React, {memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from '../../../components';
import {ButtonEmphasis} from '../../../components/Button/types';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';

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
        style={{paddingBottom: padding(10)}}
        title={emphasis}
        type="h6"
      />
      {Object.keys(color.text).map((c: any) =>
        c === 'statusBar' ? null : (
          <Button center color={c} emphasis={emphasis} key={c} title={c} />
        ),
      )}
      {Object.keys(color.text).map((c: any) =>
        c === 'statusBar' ? null : (
          <Button
            center
            color={c}
            disable
            emphasis={emphasis}
            key={c}
            title={c}
          />
        ),
      )}
      {Object.keys(color.text).map((c: any) =>
        c === 'statusBar' ? null : (
          <Button
            center
            color={c}
            dropShadow
            emphasis={emphasis}
            key={c}
            title={c}
          />
        ),
      )}
    </View>
  );
});
