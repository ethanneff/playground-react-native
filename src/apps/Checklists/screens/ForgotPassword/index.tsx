import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
  Text,
  TextInput,
  Toast,
  View,
  type TextInputRef,
} from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing, useAuth, useColors } from '../../../../features';
import { type UnAuthStackRoutes } from '../../types';

export const ForgotPassword = () => {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'forgot-password'>>();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const colors = useColors();
  const emailRef = useRef<TextInputRef>(null);

  const handleForgotPassword = useCallback(async () => {
    if (!email) {
      Toast.show({
        props: { title: 'Please enter a valid email address.' },
        type: 'negative',
      });
      emailRef.current?.focus();
      return;
    }
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
    goBack();
    Toast.show({
      props: { title: `An email was sent to ${email} to reset your password.` },
      type: 'positive',
    });
  }, [email, goBack, resetPassword]);

  const handleChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Reset Password"
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
              title="Please enter the email address associated with your account to receive a link to reset your password."
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
              onChangeText={handleChange}
              onRef={emailRef}
              onSubmitEditing={handleForgotPassword}
              placeholder="Email address"
              returnKeyType="next"
              textContentType="username"
              value={email}
            />
            <Button
              center
              color="accent"
              disabled={loading}
              emphasis="high"
              onPress={handleForgotPassword}
              title="reset password"
            />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
