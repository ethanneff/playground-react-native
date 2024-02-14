import React, { useCallback, useState } from 'react';
import {
  Button,
  Input,
  Screen,
  ScrollView,
  Spacing,
  View,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing, useColors } from '../../../features';
import { type PortfolioNavigation } from '../types';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { goBack, navigate } = useNavigation<PortfolioNavigation>();
  const handlePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);
  const handleEmail = useCallback((value: string) => {
    setEmail(value);
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
        <Spacing padding={spacing(2)} />
        <Input
          hideError
          onChangeText={handlePassword}
          placeholder="•••••••"
          title="password"
          value={password}
        />
        <Spacing padding={spacing(2)} />
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
};
