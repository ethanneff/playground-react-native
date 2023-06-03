import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
  Text,
  TextInput,
  View,
  type TextInputRef,
} from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing, useAuth, useColors } from '../../../../features';
import { type UnAuthStackRoutes } from '../../types';

export const SignUp = () => {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'sign-in'>>();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const eyeIcon = eye ? 'eye-outline' : 'eye-off-outline';
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const colors = useColors();
  const { signUpEmail } = useAuth();

  const handleEmail = useCallback(async () => {
    setLoading(true);
    await signUpEmail(form.email, form.password);
    setLoading(false);
  }, [form.email, form.password, signUpEmail]);

  const handleFormChange = useCallback(
    (key: string) => (val: string) => {
      setForm((prev) => ({ ...prev, [key]: val }));
    },
    [],
  );

  const handleEyePress = useCallback(() => {
    setEye((prev) => !prev);
    passwordRef.current?.focus();
  }, []);

  const handleFormSubmit = useCallback(
    (key: string) => () => {
      if (key === 'password') {
        handleEmail();
      }
      if (key === 'email') {
        passwordRef.current?.focus();
      }
    },
    [handleEmail],
  );

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Sign up"
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
              title="Enter an email address and password to create an account."
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              focusOnLoad
              keyboardType="email-address"
              onChangeText={handleFormChange('email')}
              onRef={emailRef}
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
              onRef={passwordRef}
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
              title="sign up"
            />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
