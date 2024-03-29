import React, { useCallback } from 'react';
import { Button, Card, Screen, ScrollView, Text } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import {
  useAuth,
  useColors,
  useLayout,
  type RootNavigation,
} from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { logout } from '../../models';
import { completeConfig } from '../../utils';

// TODO: figure out a place for this
// TODO: add reminders
// TODO: add profile information
// TODO: add payment

export const Account = () => {
  const colors = useColors();
  const { tabBarEdges } = useLayout();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<RootNavigation>();
  const { logout: logoutUser } = useAuth();
  const profile = useAppSelector((s) => s.complete.auth);

  const onNavToAdmin = useCallback(() => {
    navigate('admin');
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    await logoutUser();
    dispatch(logout());
  }, [dispatch, logoutUser]);

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
        <Card>
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
        <Card>
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
        <Card>
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
        <Card>
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
        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: completeConfig.padding }}
            title="Settings"
            type="h5"
          />
          <Button
            onPress={handleLogout}
            title="logout"
          />
          <Button
            onPress={onNavToAdmin}
            title="go to admin"
          />
        </Card>
      </ScrollView>
    </Screen>
  );
};
