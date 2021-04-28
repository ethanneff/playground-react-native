import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Screen} from '../../../components';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';

export const NotFound = memo(function PortfolioNotFound() {
  const {goBack} = useNavigation();
  const color = useColor();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen dropShadow title="404 :(">
      <ScrollView
        style={{padding: config.padding(4), backgroundColor: color.surface}}>
        <Button center onPress={navBack} title="go back" />
      </ScrollView>
    </Screen>
  );
});
