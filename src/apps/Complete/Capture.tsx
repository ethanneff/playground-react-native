import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Card, Screen, Text} from '../../components';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();
  const navBack = useCallback(() => navigate('admin'), [navigate]);

  return (
    <Screen onLeftPress={navBack} title="Capture">
      <ScrollView
        contentContainerStyle={{
          padding: Theme.padding.p04,
        }}
        style={{backgroundColor: color.surface, flex: 1}}>
        <Card>
          <Text
            center
            style={{paddingBottom: Theme.padding.p04}}
            title="Try something new every day"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            title="Break comfort barriers to be more creative, better at dealing with change, and better a improving the future"
            type="h4"
          />
        </Card>
      </ScrollView>
    </Screen>
  );
});
