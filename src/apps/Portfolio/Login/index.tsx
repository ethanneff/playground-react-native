import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Input, Screen} from '../../../components';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';
import {PortfolioNavigation} from '../types';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-around'},
});

export const Login = memo(function PortfolioLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {goBack, navigate} = useNavigation<PortfolioNavigation>();
  const handlePassword = useCallback((val: string) => setPassword(val), []);
  const handleEmail = useCallback((val: string) => setEmail(val), []);

  const navPortfolio = useCallback(() => navigate('home'), [navigate]);
  const navPassword = useCallback(() => navigate('forgotPassword'), [navigate]);
  const color = useColor();

  return (
    <Screen dropShadow onLeftPress={goBack} title="Login">
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
        <Input
          onChangeText={handlePassword}
          placeholder="•••••••"
          title="password"
          value={password}
        />
        <View style={styles.row}>
          <Button onPress={navPortfolio} title="Login" />
          <Button onPress={navPassword} title="Forgot" />
        </View>
      </ScrollView>
    </Screen>
  );
});
