import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
  View,
  type TextInputReference,
} from '../../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
} from '../../../../conversions';
import { spacing, useAuth, useColors } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { type UnAuthStackRoutes } from '../../types';
import { LoginButton } from './LoginButton';

export const SignIn = () => {
  const { goBack, navigate } =
    useNavigation<StackNavigationProperty<UnAuthStackRoutes, 'sign-in'>>();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const eyeIcon = eye ? 'eye-outline' : 'eye-off-outline';
  const emailReference = useRef<TextInputReference>(null);
  const passwordReference = useRef<TextInputReference>(null);
  const isAppleDevice = useAppSelector(
    (state) => state.device.details?.manufacturer === 'Apple',
  );
  const colors = useColors();
  const { signInApple, signInEmail, signInFacebook, signInGoogle } = useAuth();

  const handleFacebook = useCallback(async () => {
    setLoading(true);
    await signInFacebook();
    setLoading(false);
  }, [signInFacebook]);

  const handleApple = useCallback(async () => {
    setLoading(true);
    await signInApple();
    setLoading(false);
  }, [signInApple]);

  const handleGoogle = useCallback(async () => {
    setLoading(true);
    await signInGoogle();
    setLoading(false);
  }, [signInGoogle]);

  const handleEmail = useCallback(async () => {
    setLoading(true);
    await signInEmail(form.email, form.password);
    setLoading(false);
  }, [form.email, form.password, signInEmail]);

  const handleFormChange = useCallback(
    (key: string) => (value: string) => {
      setForm((previous) => ({ ...previous, [key]: value }));
    },
    [],
  );

  const handleEyePress = useCallback(() => {
    setEye((previous) => !previous);
    passwordReference.current?.focus();
  }, []);

  const handleFormSubmit = useCallback(
    (key: string) => () => {
      if (key === 'password') {
        handleEmail();
      }
      if (key === 'email') {
        passwordReference.current?.focus();
      }
    },
    [handleEmail],
  );

  const handleForgotPassword = useCallback(() => {
    navigate('forgot-password');
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate('sign-up');
  }, [navigate]);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Sign In"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing(4),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <View
            gap={spacing(4)}
            padding={spacing(4)}
          >
            <Text
              center
              emphasis="medium"
              title="Enter the email address and password associated with your account."
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="email-address"
              onChangeText={handleFormChange('email')}
              onRef={emailReference}
              onSubmitEditing={handleFormSubmit('email')}
              placeholder="Email address"
              returnKeyType="next"
              textContentType="username"
              value={form.email}
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              icons={[{ focus: true, name: eyeIcon, onPress: handleEyePress }]}
              keyboardType="default"
              onChangeText={handleFormChange('password')}
              onRef={passwordReference}
              onSubmitEditing={handleFormSubmit('password')}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={!eye}
              textContentType="password"
              value={form.password}
            />
            <Button
              center
              color="accent"
              disabled={loading}
              emphasis="high"
              onPress={handleEmail}
              title="sign in"
            />
            <View
              flexDirection="row"
              justifyContent="space-between"
              style={{ marginTop: spacing(2) }}
            >
              <Button
                center
                disabled={loading}
                lowercase
                noPadding
                onPress={handleSignUp}
                title="Create account?"
              />
              <Button
                center
                disabled={loading}
                lowercase
                noPadding
                onPress={handleForgotPassword}
                title="Forgot password?"
              />
            </View>
          </View>
        </Card>
        <Spacing padding={spacing(2)} />
        <View
          gap={spacing(4)}
          padding={spacing(4)}
        >
          <LoginButton
            icon="facebook"
            onPress={handleFacebook}
            title="Sign in with Facebook"
          />
          <LoginButton
            icon="google"
            onPress={handleGoogle}
            title="Sign in with Google"
          />
          {isAppleDevice ? (
            <LoginButton
              icon="apple"
              onPress={handleApple}
              title="Sign in with Apple"
            />
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
