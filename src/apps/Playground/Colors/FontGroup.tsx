import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from '../../../components';
import {config, FontEmphasis} from '../../../utils';

type FontGroupProps = {
  emphasis: FontEmphasis;
};

export const FontGroup = memo(function FontGroup({emphasis}: FontGroupProps) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text
        bold
        center
        style={{paddingBottom: config.padding(10)}}
        title={emphasis}
        type="h6"
      />
      {Object.keys(config.fontSizes).map((c: any) =>
        c === 'statusBar' ? null : (
          <Text center emphasis={emphasis} key={c} title={c} type={c} />
        ),
      )}
    </View>
  );
});
