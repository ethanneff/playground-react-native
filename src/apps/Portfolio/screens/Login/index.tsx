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

  return (
    <Screen gutter onLeftPress={nav.to('portfolioLanding')} title="Login">
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
        <Button onPress={nav.to('portfolio')} title="Login" />
        <Button onPress={nav.to('portfolioForgotPassword')} title="Forgot" />
      </View>
    </Screen>
  );
});
