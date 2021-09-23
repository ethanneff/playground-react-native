import React, { memo } from 'react';
import { Screen, Text } from '../../../../components';

export const Profile = memo(function Profile() {
  return (
    <Screen dropShadow title="Profile">
      <Text title="Profile" />
    </Screen>
  );
});
