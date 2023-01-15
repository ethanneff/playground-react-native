import React, { memo } from 'react';
import { Text, View } from '../../../../components';
import {
  type FontEmphasis,
  fontSizes,
  type FontType,
  spacing,
} from '../../../../features';

type FontGroupProps = {
  emphasis: FontEmphasis;
};

export const FontGroup = memo(function FontGroup({ emphasis }: FontGroupProps) {
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
      {sizes.map((c) => (
        <Text
          center
          emphasis={emphasis}
          key={c}
          title={c}
          type={c}
        />
      ))}
    </View>
  );
});
