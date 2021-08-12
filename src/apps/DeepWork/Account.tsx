import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Calendar, Card, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {padding, useColor} from '../../features';

export const Account = memo(function Account() {
  const {goBack} = useNavigation();
  const color = useColor();

  return (
    <Screen onLeftPress={goBack} title="Account">
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
