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
          paddingHorizontal: spacing(4),
          paddingVertical: spacing(2),
        }}
        keyboardShouldPersistTaps="handled"
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
