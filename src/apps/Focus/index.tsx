import React, { memo } from 'react';
import { View } from '../../components';
import { FirebaseSync } from './data';
import { Navigation } from './navigation';

export default memo(function Focus() {
  return (
    <View flex>
      <Navigation />
      <FirebaseSync />
    </View>
  );
});
