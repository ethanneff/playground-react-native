import React, { memo } from 'react';
import { Text, View } from '../../../../components';
import {
  FontEmphasis,
  fontSizes,
  FontType,
  spacing,
} from '../../../../features';

type FontGroupProps = {
  emphasis: FontEmphasis;
};

export const FontGroup = memo(function FontGroup({ emphasis }: FontGroupProps) {
  const sizes = Object.keys(fontSizes) as Array<FontType>;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
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
