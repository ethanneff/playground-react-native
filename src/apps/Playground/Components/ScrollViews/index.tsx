import React, { memo } from 'react';
import { Screen, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { ExampleList } from './ExampleList';
import { ExampleScroll } from './ExampleScroll';

export const ScrollViews = memo(function ScrollViews() {
  const { goBack } = useNavigation();

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="ScrollViews"
    >
      <View flex={1}>
        <ExampleList
          horizontal
          location={27}
        />
        <ExampleScroll horizontal />
      </View>
      <View
        flex={1}
        flexDirection="row"
      >
        <ExampleList location={22} />
        <ExampleScroll />
      </View>
    </Screen>
  );
});
