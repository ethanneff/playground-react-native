import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, TextInput} from '../../../../components';
import {useNav} from '../../../../hooks';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default memo(function PortfolioLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNav();
  const handlePassword = useCallback((val: string) => setPassword(val), []);
  const handleEmail = useCallback((val: string) => setEmail(val), []);
  const navBack = useCallback(nav('portfolioLanding'), [nav]);
  const navPortfolio = useCallback(nav('portfolio'), [nav]);
  const navPassword = useCallback(nav('portfolioForgotPassword'), [nav]);

  return (
    <Screen gutter onLeftPress={navBack} title="Login">
      <TextInput
        onChangeText={handleEmail}
        placeholder="example@gmail.com"
        title="email"
        value={email}
      />
      <TextInput
        onChangeText={handlePassword}
        placeholder="•••••••"
        title="password"
        value={password}
      />
      <View style={styles.row}>
        <Button onPress={navPortfolio} title="Login" />
        <Button onPress={navPassword} title="Forgot" />
      </View>
    </Screen>
  );
});
