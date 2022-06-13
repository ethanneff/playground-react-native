import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect } from 'react';
import { Button, Screen, ScrollView, Text } from '../../../../components';
import {
  padding,
  RootNavigation,
  useAuth,
  useColors,
  useLayout,
  useTabTap,
} from '../../../../features';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { Card } from '../../components';
import { logout } from '../../models';

// TODO: figure out a place for this
// TODO: add reminders
// TODO: add profile information
// TODO: add payment

export const Account = memo(function Account() {
  useTabTap();
  const colors = useColors();
  const { tabBarEdges } = useLayout();
  const dispatch = useRootDispatch();
  const { navigate } = useNavigation<RootNavigation>();
  const { onLogout, response } = useAuth();
  const profile = useRootSelector((s) => s.completeAuth);
  const onNavToAdmin = useCallback(() => navigate('admin'), [navigate]);

  useEffect(() => {
    if (response.type === 'logout') dispatch(logout());
  }, [dispatch, response.type]);

  return (
    <Screen edges={tabBarEdges} title="Account">
      <ScrollView
        contentContainerStyle={{
          padding: padding(4),
          backgroundColor: colors.background.secondary,
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{ paddingBottom: padding(4) }}
            title="Profile"
            type="h5"
          />
          <Text title={profile?.displayName || ''} />
          <Text title={profile?.email || ''} />
          <Text title={String(profile?.emailVerified) || ''} />
          <Text title={profile?.uid || ''} />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{ paddingBottom: padding(4) }}
            title="Reminders"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{ paddingBottom: padding(4) }}
            title="Payment"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Card margin="bottom">
          <Text
            emphasis="low"
            style={{ paddingBottom: padding(4) }}
            title="Feedback"
            type="h5"
          />
          <Text center emphasis="medium" title="..." type="h4" />
        </Card>
        <Button onPress={onLogout} title="logout" />
        {response.error ? (
          <Text color="negative" title={response.error} />
        ) : null}
        <Button onPress={onNavToAdmin} title="go to admin" />
      </ScrollView>
    </Screen>
  );
});
