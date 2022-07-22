import React, { memo, useCallback } from 'react';
import {
  Button,
  Card,
  Screen,
  ScrollView,
  Text,
  View,
} from '../../../../components';
import { auth } from '../../../../conversions/Firebase';
import { spacing, useColors, useLayout } from '../../../../features';

export const Profile = memo(function Profile() {
  const colors = useColors();
  const { tabBarEdges } = useLayout();

  const handleLogout = useCallback(async () => {
    await auth().signOut();
  }, []);

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Profile"
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing(4),
          paddingVertical: spacing(2),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: spacing(2) }}
            title="Profile"
            type="h4"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text title="avatar" />
            <View>
              <Text title="name" />
              <Text title="email" />
            </View>
          </View>
          <Button
            color="accent"
            title="upgrade to premium"
          />
          <Button title="reset password" />
          <Button title="delete account" />
          <Button title="restore transactions" />
          <Button
            onPress={handleLogout}
            title="log out"
          />
        </Card>

        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: spacing(2) }}
            title="Preferences"
            type="h4"
          />
          <Button title="intervals" />
          <Button title="notifications" />
          <Button title="theme" />
        </Card>

        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: spacing(2) }}
            title="App"
            type="h4"
          />
          <Button title="support" />
          <Button title="feedback" />
          <Button title="about" />
          <Button title="terms of use" />
          <Button title="privacy policy" />
        </Card>
      </ScrollView>
    </Screen>
  );
});
