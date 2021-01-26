import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button, Screen, Text} from '../../../../components';
import {ScrollView} from '../../../../conversions';
import {useColor} from '../../../../hooks';
import {config, useRootDispatch} from '../../../../utils';
import {Card} from '../../components';
import {removeUser} from '../../models';
import {useTabTap} from '../../utils';

// TODO: figure out a place for this
// TODO: add reminders
// TODO: add profile information
// TODO: add payment

export const Account = memo(function Account() {
  useTabTap();
  const color = useColor();
  const dispatch = useRootDispatch();
  const {goBack, navigate} = useNavigation();

  const onLogout = useCallback(() => {
    dispatch(removeUser());
  }, [dispatch]);

  const onNavToAdmin = useCallback(() => navigate('admin'), [navigate]);

  return (
    <Screen title="Account">
      <ScrollView
        contentContainerStyle={{
          padding: config.padding(4),
          backgroundColor: color.surface,
        }}
        style={{backgroundColor: color.surface}}>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{paddingBottom: config.padding(4)}}
            title="Profile"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{paddingBottom: config.padding(4)}}
            title="Reminders"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{paddingBottom: config.padding(4)}}
            title="Payment"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{paddingBottom: config.padding(4)}}
            title="Feedback"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Button onPress={onLogout} title="logout" />
        <Button onPress={onNavToAdmin} title="go to admin" />
      </ScrollView>
    </Screen>
  );
});
