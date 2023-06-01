import React, { memo } from 'react';
import { View } from '../../components';
import { Navigation } from './Navigation';
import { FirebaseSync } from './data';

export default memo(function Checklists() {
  return (
    <View flex={1}>
      <Navigation />
      <FirebaseSync />
    </View>
  );
});
