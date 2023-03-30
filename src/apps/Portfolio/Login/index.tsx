import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Screen, ScrollView, View } from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing, useColors } from '../../../features';
import { type PortfolioNavigation } from '../types';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-around' },
});

export const Login = memo(function PortfolioLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { goBack, navigate } = useNavigation<PortfolioNavigation>();
  const handlePassword = useCallback((val: string) => {
    setPassword(val);
  }, []);
  const handleEmail = useCallback((val: string) => {
    setEmail(val);
  }, []);

  const navPortfolio = useCallback(() => {
    navigate('home');
  }, [navigate]);
  const navPassword = useCallback(() => {
    navigate('forgotPassword');
  }, [navigate]);
  const colors = useColors();

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Login"
    >
      <ScrollView
        style={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
      >
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
          <Button
            onPress={navPortfolio}
            title="Login"
          />
          <Button
            onPress={navPassword}
            title="Forgot"
          />
        </View>
      </ScrollView>
    </Screen>
  );
});
