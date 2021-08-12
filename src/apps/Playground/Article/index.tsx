import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Card, Screen} from '../../../components';
import {Content} from '../../../components/Content';
import {ScrollView} from '../../../conversions';
import {padding, useColor} from '../../../features';
import {data} from './data';

export const Article = memo(function PlaygroundArticle() {
  const {goBack} = useNavigation();

  const color = useColor();
  return (
    <Screen dropShadow onLeftPress={goBack} title="Article">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: color.background.secondary}}>
        <Card>
          <Content sections={data} />
        </Card>
      </ScrollView>
    </Screen>
  );
});
