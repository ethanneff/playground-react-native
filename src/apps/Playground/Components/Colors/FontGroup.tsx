import React from 'react';
import { Text, View } from '../../../../components';
import {
  fontSizes,
  spacing,
  type FontEmphasis,
  type FontType,
} from '../../../../features';

type FontGroupProperties = {
  readonly emphasis: FontEmphasis;
};

export const FontGroup = ({ emphasis }: FontGroupProperties) => {
  const sizes = Object.keys(fontSizes) as FontType[];
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text
        bold
        center
        style={{ paddingBottom: spacing(10) }}
        title={emphasis}
        type="h6"
      />
      {sizes.map((size) => (
        <Text
          center
          emphasis={emphasis}
          key={size}
          title={size}
          type={size}
        />
      ))}
    </View>
  );
};
