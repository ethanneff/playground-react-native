import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect } from 'react';
import { Button, Card, Screen, ScrollView, Text } from '../../../../components';
import {
  useAuth,
  useColors,
  useLayout,
  type RootNavigation,
} from '../../../../features';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { logout } from '../../models';
import { completeConfig } from '../../utils';

// TODO: figure out a place for this
// TODO: add reminders
// TODO: add profile information
// TODO: add payment

export const Account = memo(function Account() {
  const colors = useColors();
  const { tabBarEdges } = useLayout();
  const dispatch = useRootDispatch();
  const { navigate } = useNavigation<RootNavigation>();
  const { onLogout, response } = useAuth();
  const profile = useRootSelector((s) => s.completeAuth);
  const onNavToAdmin = useCallback(() => {
    navigate('admin');
  }, [navigate]);

  useEffect(() => {
    if (response.type === 'logout') dispatch(logout());
  }, [dispatch, response.type]);

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Account"
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background.secondary,
          gap: completeConfig.padding,
          padding: completeConfig.padding,
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card elevation={4}>
          <Text
            emphasis="medium"
            style={{ paddingBottom: completeConfig.padding }}
            title="Profile"
            type="h5"
          />
          <Text title={profile?.displayName ?? ''} />
          <Text title={profile?.email ?? ''} />
          <Text title={String(profile?.emailVerified ?? '')} />
          <Text title={profile?.uid ?? ''} />
          <Text
            center
            emphasis="medium"
            title="..."
            type="h4"
          />
        </Card>
        <Card elevation={4}>
          <Text
            emphasis="medium"
            style={{ paddingBottom: completeConfig.padding }}
            title="Reminders"
            type="h5"
          />
          <Text
            center
            emphasis="medium"
            title="..."
            type="h4"
          />
        </Card>
        <Card elevation={4}>
          <Text
            emphasis="medium"
            style={{ paddingBottom: completeConfig.padding }}
            title="Payment"
            type="h5"
          />
          <Text
            center
            emphasis="medium"
            title="..."
            type="h4"
          />
        </Card>
        <Card elevation={4}>
          <Text
            emphasis="medium"
            style={{ paddingBottom: completeConfig.padding }}
            title="Feedback"
            type="h5"
          />
          <Text
            center
            emphasis="medium"
            title="..."
            type="h4"
          />
        </Card>
        <Card elevation={4}>
          <Text
            emphasis="medium"
            style={{ paddingBottom: completeConfig.padding }}
            title="Settings"
            type="h5"
          />
          <Button
            onPress={onLogout}
            title="logout"
          />
          {response.error ? (
            <Text
              color="negative"
              title={response.error}
            />
          ) : null}
          <Button
            onPress={onNavToAdmin}
            title="go to admin"
          />
        </Card>
      </ScrollView>
    </Screen>
  );
});
