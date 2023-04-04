import React, { memo } from 'react';
import { Card, Content, Screen, ScrollView } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { data } from './data';

export const Paragraphs = memo(function Paragraphs() {
  const { goBack } = useNavigation();

  const colors = useColors();
  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Paragraphs"
    >
      <ScrollView
        contentContainerStyle={{
          gap: spacing(4),
          padding: spacing(4),
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <Content sections={data} />
        </Card>
      </ScrollView>
    </Screen>
  );
});
