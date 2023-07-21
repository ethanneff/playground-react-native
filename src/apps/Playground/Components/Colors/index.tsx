import React from 'react';
import { Screen, ScrollView, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { ButtonGroup } from './ButtonGroup';
import { FontGroup } from './FontGroup';
import { TagGroup } from './TagGroup';
import { ThemeGroup } from './ThemeGroup';
import { Title } from './Title';

export const Colors = () => {
  const { goBack } = useNavigation();

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Colors"
    >
      <ScrollView>
        <Title title="Theme" />
        <ThemeGroup />
        <Title title="Buttons" />
        <View flexDirection="row">
          <ButtonGroup emphasis="high" />
          <ButtonGroup emphasis="medium" />
          <ButtonGroup emphasis="low" />
        </View>
        <Title title="Tags" />
        <TagGroup />
        <Title title="Fonts" />
        <View flexDirection="row">
          <FontGroup emphasis="default" />
          <FontGroup emphasis="high" />
          <FontGroup emphasis="medium" />
          <FontGroup emphasis="low" />
        </View>
      </ScrollView>
    </Screen>
  );
};
