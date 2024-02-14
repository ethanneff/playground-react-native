import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
  Toast,
  type TextInputReference,
} from '../../../../components';
import {
  Firebase,
  type StackNavigationProperty,
  useIsFocused,
  useNavigation,
  useRoute,
  type FirebaseAuthTypes,
  type RouteProp as RouteProperty,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { type UnAuthStackRoutes } from '../../types';

const initialState = { loading: false };

export const ForgotPassword = () => {
  const { goBack } =
    useNavigation<
      StackNavigationProperty<UnAuthStackRoutes, 'forgot-password'>
    >();
  const route = useRoute<RouteProperty<UnAuthStackRoutes, 'forgot-password'>>();
  const email = useRef(route.params.email);
  const [state, setState] = useState<typeof initialState>(initialState);
  const emailReference = useRef<TextInputReference>(null);
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
    } catch (error) {
      setState((p) => ({ ...p, loading: false }));
      const firebaseError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      Toast.show({
        props: {
          description: firebaseError.nativeErrorMessage,
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
    emailReference.current?.focus();
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
        <Spacing padding={spacing(2)} />
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
          editable={state.loading}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          onRef={emailReference}
          onSubmitEditing={handleResetPassword}
          placeholder="Email address"
          returnKeyType="send"
          secureTextEntry={false}
          textContentType="username"
          value={email.current}
        />
        <Spacing padding={spacing(2)} />
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
};
