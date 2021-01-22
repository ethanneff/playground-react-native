import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Card, Screen} from '../../../components';
import {Content} from '../../../components/Content';
import {ScrollView} from '../../../conversions';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';
import {data} from './data';

export const Article = memo(function PlaygroundArticle() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  const color = useColor();
  return (
    <Screen dropShadow onLeftPress={navBack} title="Article">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: config.padding(4),
          paddingVertical: config.padding(2),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: color.surface}}>
        <Card>
          <Content sections={data} />
        </Card>
      </ScrollView>
    </Screen>
  );
});
