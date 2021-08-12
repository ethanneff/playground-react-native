import React, {memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from '../../../components';
import {ButtonEmphasis} from '../../../components/Button/types';
import {padding, useColor} from '../../../features';

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
        center
        style={{paddingBottom: padding(5)}}
        title={emphasis}
        type="h5"
      />
      {Object.keys(color.text).map((c: any) =>
        c === 'statusBar' ? null : (
          <Button
            buttonStyle={{margin: 4}}
            center
            color={c}
            disabled={c === 'disabled'}
            emphasis={emphasis}
            key={c}
            title={c}
          />
        ),
      )}
      {Object.keys(color.text).map((c: any) =>
        c === 'statusBar' ? null : (
          <Button
            buttonStyle={{margin: 4}}
            center
            color={c}
            disabled={c === 'disabled'}
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
