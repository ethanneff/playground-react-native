import React from 'react';
import { View } from '../../components';
import { Navigation } from './Navigation';
import { FirebaseSync } from './data';

export const Checklists = () => (
  <View flex={1}>
    <Navigation />
    <FirebaseSync />
  </View>
);
