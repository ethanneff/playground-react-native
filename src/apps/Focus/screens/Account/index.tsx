import React, { useCallback } from 'react';
import {
  Button,
  Card,
  Screen,
  ScrollView,
  Text,
  View,
} from '../../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
} from '../../../../conversions';
import {
  spacing,
  useAdminNavBack,
  useAuth,
  useColors,
  useLayout,
} from '../../../../features';
import { type AuthStackRoutes } from '../../types';

export const Account = () => {
  const { navigate } =
    useNavigation<StackNavigationProperty<AuthStackRoutes, 'home'>>();
  const colors = useColors();
  const { tabBarEdges } = useLayout();
  const { admin } = useAdminNavBack();
  const { logout } = useAuth();

  const handleAdmin = useCallback(() => {
    navigate('admin');
  }, [navigate]);

  const handleDebug = useCallback(() => {
    navigate('debug');
  }, [navigate]);

  const handlePress = useCallback(() => null, []);

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Profile"
    >
      <ScrollView
        contentContainerStyle={{
          gap: spacing(4),
          padding: spacing(4),
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
              alignItems: 'center',
              flexDirection: 'row',
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
            onPress={handlePress}
            title="upgrade to premium"
          />
          <Button
            onPress={handlePress}
            title="reset password"
          />
          <Button
            onPress={handlePress}
            title="delete account"
          />
          <Button
            onPress={handlePress}
            title="restore transactions"
          />
          <Button
            onPress={logout}
            title="log out"
          />
          {admin ? (
            <Button
              onPress={handleAdmin}
              title="admin"
            />
          ) : null}
          {admin ? (
            <Button
              onPress={handleDebug}
              title="debug"
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
          <Button
            onPress={handlePress}
            title="intervals"
          />
          <Button
            onPress={handlePress}
            title="notifications"
          />
          <Button
            onPress={handlePress}
            title="theme"
          />
        </Card>
        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: spacing(2) }}
            title="App"
            type="h4"
          />
          <Button
            onPress={handlePress}
            title="support"
          />
          <Button
            onPress={handlePress}
            title="feedback"
          />
          <Button
            onPress={handlePress}
            title="about"
          />
          <Button
            onPress={handlePress}
            title="terms of use"
          />
          <Button
            onPress={handlePress}
            title="privacy policy"
          />
        </Card>
      </ScrollView>
    </Screen>
  );
};
