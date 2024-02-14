import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
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
import { type UnAuthStackRoutes } from '../../types';

export const SignUp = () => {
  const { goBack } =
    useNavigation<StackNavigationProperty<UnAuthStackRoutes, 'sign-in'>>();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const eyeIcon = eye ? 'eye-outline' : 'eye-off-outline';
  const emailReference = useRef<TextInputReference>(null);
  const passwordReference = useRef<TextInputReference>(null);
  const colors = useColors();
  const { signUpEmail } = useAuth();

  const handleEmail = useCallback(async () => {
    setLoading(true);
    await signUpEmail(form.email, form.password);
    setLoading(false);
  }, [form.email, form.password, signUpEmail]);

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
              title="sign up"
            />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
