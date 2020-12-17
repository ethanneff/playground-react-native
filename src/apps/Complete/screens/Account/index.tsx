import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';

// TODO: figure out a place for this
// TODO: add reminders
// TODO: add profile information
// TODO: add payment

export const Account = memo(function Account() {
  const color = useColor();
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  const onLogin = useCallback(() => {}, []);
  const onLogout = useCallback(() => {}, []);

  return (
    <Screen onLeftPress={navBack} title="Account">
      <ScrollView
        contentContainerStyle={{
          padding: Theme.padding.p04,
        }}
        style={{flex: 1, backgroundColor: color.surface}}>
        <Card>
          <Text
            style={{paddingBottom: Theme.padding.p04}}
            title="Profile"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            title="Break comfort barriers to be more creative, better at dealing with change, and better a improving the future"
            type="h4"
          />
        </Card>
        <Card>
          <Text
            style={{paddingBottom: Theme.padding.p04}}
            title="Reminders"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            title="Break comfort barriers to be more creative, better at dealing with change, and better a improving the future"
            type="h4"
          />
        </Card>
        <Card>
          <Text
            style={{paddingBottom: Theme.padding.p04}}
            title="Payment"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            title="Break comfort barriers to be more creative, better at dealing with change, and better a improving the future"
            type="h4"
          />
        </Card>
        <Button onPress={onLogin} title="login" />
        <Button onPress={onLogout} title="logout" />
      </ScrollView>
    </Screen>
  );
});
