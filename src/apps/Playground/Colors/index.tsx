import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Screen} from '../../../components';
import {ScrollView} from '../../../conversions';
import {ButtonGroup} from './ButtonGroup';
import {FontGroup} from './FontGroup';
import {Title} from './Title';

// text: high 87% medium 60% disabled 38%
// icon: active 100% inactive 60% disabled 38%

// create tag component with colors https://oomphinc.github.io/colorcube/#results-content https://stripe.com/blog/accessible-color-systems
// add light + dark + border + secondary greys
// keep original colors

export const Colors = memo(function DebugColors() {
  // const {goBack} = useNavigation();
  const navBack = useCallback(() => undefined, []);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Colors">
      <ScrollView>
        <Title title="Theme" />
        {/* <ThemeGroup /> */}
        <Title title="Buttons" />
        <View style={{flexDirection: 'row'}}>
          <ButtonGroup emphasis="high" />
          <ButtonGroup emphasis="medium" />
          <ButtonGroup emphasis="low" />
        </View>
        <Title title="Fonts" />
        <View style={{flexDirection: 'row'}}>
          <FontGroup emphasis="none" />
          <FontGroup emphasis="high" />
          <FontGroup emphasis="medium" />
          <FontGroup emphasis="low" />
        </View>
      </ScrollView>
    </Screen>
  );
});
