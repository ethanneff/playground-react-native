import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Calendar, Card, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {useColor} from '../../hooks';
import {padding} from '../../utils';

export const Account = memo(function Account() {
  const {goBack} = useNavigation();
  const color = useColor();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="Account">
      <ScrollView
        contentContainerStyle={{padding: padding(4)}}
        style={{backgroundColor: color.background.secondary}}>
        <Card>
          <Text
            center
            style={{paddingBottom: padding(4)}}
            title="Progress"
            type="h5"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
});
