import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Button, Screen, Text } from '../../../../components';

export const Profile = memo(function Profile() {
  return (
    <Screen dropShadow title="Profile">
      <ScrollView>
        <Text title="Profile" />
        <Button title="delete account" />
        <Button title="log out" />
        <Button title="notifications settings" />
        <Button title="theme" />
        <Button title="restore purchases" />
      </ScrollView>
    </Screen>
  );
});
