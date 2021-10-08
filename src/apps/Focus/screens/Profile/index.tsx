import React, { memo } from 'react';
import { Button, Screen, Text } from '../../../../components';

export const Profile = memo(function Profile() {
  return (
    <Screen dropShadow title="Profile">
      <Text title="Profile" />
      <Button title="delete account" />
      <Button title="log out" />
      <Button title="notifications settings" />
      <Button title="theme" />
      <Button title="restore purchases" />
    </Screen>
  );
});
