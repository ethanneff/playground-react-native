import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme, useRootDispatch} from '../../../../utils';
import {
  createBoard,
  createItem,
  createList,
  createUser,
  removeUser,
  setActiveUser,
} from '../../models';
import {getDefaultUserTemplate} from './factory';

// TODO: figure out a place for this
// TODO: add reminders
// TODO: add profile information
// TODO: add payment

export const Account = memo(function Account() {
  const color = useColor();
  const dispatch = useRootDispatch();
  const {goBack, navigate} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  const onLogin = useCallback(() => {
    const {user, boards, lists, items} = getDefaultUserTemplate();
    items.map((item) => dispatch(createItem(item)));
    lists.map((list) => dispatch(createList(list)));
    boards.map((board) => dispatch(createBoard(board)));
    dispatch(createUser(user));
  }, [dispatch]);
  const onLogout = useCallback(() => {
    dispatch(removeUser());
    navigate('main');
  }, [dispatch, navigate]);
  const onSetActive = useCallback(() => {
    dispatch(setActiveUser(true));
  }, [dispatch]);

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
        <Button onPress={onSetActive} title="set active" />
      </ScrollView>
    </Screen>
  );
});
