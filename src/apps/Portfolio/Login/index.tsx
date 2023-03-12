import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import {
  Button,
  Input,
  Screen,
  ScrollView,
  Spacing,
  View,
} from '../../../components';
import { spacing, useColors } from '../../../features';
import { type PortfolioNavigation } from '../types';

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
          hideError
          onChangeText={handleEmail}
          placeholder="example@gmail.com"
          title="email"
          value={email}
        />
        <Spacing padding={2} />
        <Input
          hideError
          onChangeText={handlePassword}
          placeholder="•••••••"
          title="password"
          value={password}
        />
        <Spacing padding={2} />
        <View
          flexDirection="row"
          justifyContent="space-around"
        >
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
