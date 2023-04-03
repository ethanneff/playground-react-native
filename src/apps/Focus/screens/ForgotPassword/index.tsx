import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
  Toast,
  type TextInputRef,
} from '../../../../components';
import {
  Firebase,
  useIsFocused,
  useNavigation,
  useRoute,
  type FirebaseAuthTypes,
  type RouteProp,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { type UnAuthStackRoutes } from '../../types';

const initialState = { loading: false };

export const ForgotPassword = memo(function ForgotPassword() {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'forgot-password'>>();
  const route = useRoute<RouteProp<UnAuthStackRoutes, 'forgot-password'>>();
  const email = useRef(route.params.email);
  const [state, setState] = useState<typeof initialState>(initialState);
  const emailRef = useRef<TextInputRef>(null);
  const focus = useIsFocused();

  const handleResetPassword = useCallback(async () => {
    if (!email.current) {
      Toast.show({
        props: {
          title: 'Please enter your email address.',
        },
        type: 'negative',
      });
      return;
    }

    setState((p) => ({ ...p, loading: true }));

    try {
      await Firebase.auth().sendPasswordResetEmail(email.current);
      setState((p) => ({ ...p, loading: false }));
      Toast.show({
        props: { title: 'Please check your email to reset your password.' },
        type: 'positive',
      });
      goBack();
    } catch (e) {
      setState((p) => ({ ...p, loading: false }));
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      Toast.show({
        props: {
          description: `${err.nativeErrorMessage}`,
          title: 'Unable to reset your password.',
        },
        type: 'negative',
      });
      Firebase.crashlytics().log('unable to reset password');
    }
  }, [email, goBack]);

  const handleEmailChange = useCallback((value: string) => {
    email.current = value;
  }, []);

  useEffect(() => {
    if (!focus) return;
    emailRef.current?.focus();
  }, [focus]);

  return (
    <Screen
      onLeftPress={goBack}
      title="Forgot password"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing(8),
          paddingVertical: spacing(4),
        }}
      >
        <Text
          center
          emphasis="medium"
          title="Enter your email address to receive a link to reset your password."
        />
        <Spacing padding={2} />
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
          editable={state.loading}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          onRef={emailRef}
          onSubmitEditing={handleResetPassword}
          placeholder="Email address"
          returnKeyType="send"
          secureTextEntry={false}
          textContentType="username"
          value={email.current}
        />
        <Spacing padding={2} />
        <Button
          center
          color="accent"
          disabled={state.loading}
          emphasis="high"
          onPress={handleResetPassword}
          title="send email"
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
});
