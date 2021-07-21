import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Input, Screen} from '../../../components';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-around'},
});

export const ForgotPassword = memo(function PortfolioForgotPassword() {
  const [email, setEmail] = useState('');
  const {goBack} = useNavigation();
  const handleEmail = useCallback((val: string) => setEmail(val), []);
  const navLogin = useCallback(() => goBack(), [goBack]);
  const color = useColor();
  return (
    <Screen dropShadow onLeftPress={navLogin} title="Forgot Password">
      <ScrollView
        style={{
          padding: padding(4),
          backgroundColor: color.background.secondary,
        }}>
        <Input
          onChangeText={handleEmail}
          placeholder="example@gmail.com"
          title="email"
          value={email}
        />
        <View style={styles.row}>
          <Button onPress={navLogin} title="Send email" />
        </View>
      </ScrollView>
    </Screen>
  );
});
