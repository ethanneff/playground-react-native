import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme, useRootDispatch} from '../../../../utils';
import {AlertWrapper, Card} from '../../components';
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
    goBack();
  }, [dispatch, goBack]);
  const onLogout = useCallback(() => {
    dispatch(removeUser());
    navigate('main');
  }, [dispatch, navigate]);
  const onSetActive = useCallback(() => {
    dispatch(setActiveUser(true));
  }, [dispatch]);

  const onNavToAdmin = useCallback(() => navigate('admin'), [navigate]);

  return (
    <AlertWrapper backgroundColor={color.surface} onBackgroundPress={navBack}>
      <Card>
        <Text
          style={{paddingBottom: Theme.padding.p04}}
          title="Profile"
          type="h3"
        />
        <Text center emphasis="medium" title="..." type="h4" />
      </Card>
      <Card>
        <Text
          style={{paddingBottom: Theme.padding.p04}}
          title="Reminders"
          type="h3"
        />
        <Text center emphasis="medium" title="..." type="h4" />
      </Card>
      <Card>
        <Text
          style={{paddingBottom: Theme.padding.p04}}
          title="Payment"
          type="h3"
        />
        <Text center emphasis="medium" title="..." type="h4" />
      </Card>
      <Card>
        <Text
          style={{paddingBottom: Theme.padding.p04}}
          title="Feedback"
          type="h3"
        />
        <Text center emphasis="medium" title="..." type="h4" />
      </Card>
      <Button onPress={onLogin} title="login" />
      <Button onPress={onLogout} title="logout" />
      <Button onPress={onSetActive} title="set active" />
      <Button onPress={onNavToAdmin} title="go to admin" />
    </AlertWrapper>
  );
});
