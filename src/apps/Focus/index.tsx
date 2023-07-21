import React from 'react';
import { View } from '../../components';
import { FirebaseSync } from './data';
import { Navigation } from './navigation';

export const Focus = () => (
  <View flex={1}>
    <Navigation />
    <FirebaseSync />
  </View>
);
