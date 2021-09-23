import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen } from '../../../components';
import { ScrollView } from '../../../conversions';
import { ButtonGroup } from './ButtonGroup';
import { FontGroup } from './FontGroup';
import { TagGroup } from './TagGroup';
import { ThemeGroup } from './ThemeGroup';
import { Title } from './Title';

export const Colors = memo(function DebugColors() {
  const { goBack } = useNavigation();

  return (
    <Screen dropShadow onLeftPress={goBack} title="Colors">
      <ScrollView>
        <Title title="Theme" />
        <ThemeGroup />
        <Title title="Buttons" />
        <View style={{ flexDirection: 'row' }}>
          <ButtonGroup emphasis="high" />
          <ButtonGroup emphasis="medium" />
          <ButtonGroup emphasis="low" />
        </View>
        <Title title="Tags" />
        <TagGroup />
        <Title title="Fonts" />
        <View style={{ flexDirection: 'row' }}>
          <FontGroup emphasis="none" />
          <FontGroup emphasis="high" />
          <FontGroup emphasis="medium" />
          <FontGroup emphasis="low" />
        </View>
      </ScrollView>
    </Screen>
  );
});
