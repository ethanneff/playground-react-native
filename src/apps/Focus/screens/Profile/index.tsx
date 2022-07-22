import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import {
  Button,
  Card,
  Screen,
  ScrollView,
  Text,
  Toast,
  View,
} from '../../../../components';
import { Firebase } from '../../../../conversions';
import {
  RootNavigation,
  spacing,
  useAdminNavBack,
  useColors,
  useLayout,
} from '../../../../features';

export const Profile = memo(function Profile() {
  const { navigate } = useNavigation<RootNavigation>();
  const colors = useColors();
  const { tabBarEdges } = useLayout();
  const { admin } = useAdminNavBack();

  const handleLogout = useCallback(async () => {
    try {
      await Firebase.auth().signOut();
    } catch (e) {
      Toast.show({
        type: 'accent',
        props: {
          title: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
          description: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
        },
      });
      Firebase.crashlytics().log('unable to sign out');
    }
  }, []);

  const handleAdmin = useCallback(() => {
    navigate('admin');
  }, [navigate]);

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
          {admin ? (
            <Button
              onPress={handleAdmin}
              title="admin"
            />
          ) : null}
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
