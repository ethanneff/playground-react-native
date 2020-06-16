import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, TextInput} from '../../../../components';
import {useNav} from '../../../../hooks';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default memo(function PortfolioForgotPassword() {
  const [email, setEmail] = useState('');
  const nav = useNav();
  const handleEmail = useCallback((val: string) => setEmail(val), []);
  return (
    <Screen
      gutter
      onLeftPress={nav.to('portfolioLogin')}
      title="Forgot Password">
      <TextInput
        onChangeText={handleEmail}
        placeholder="example@gmail.com"
        title="email"
        value={email}
      />
      <View style={styles.row}>
        <Button onPress={nav.to('portfolioLogin')} title="Send email" />
      </View>
    </Screen>
  );
});
