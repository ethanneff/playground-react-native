import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Button,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
  TextInputRef,
  Toast,
} from '../../../../components';
import { Firebase, FirebaseAuthTypes } from '../../../../conversions';
import { spacing } from '../../../../features';
import { UnAuthStackRoutes } from '../../types';

export const ForgotPassword = memo(function ForgotPassword() {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'forgot-password'>>();
  const route = useRoute<RouteProp<UnAuthStackRoutes, 'forgot-password'>>();
  const email = useRef(route.params.email);
  const emailRef = useRef<TextInputRef>(null);
  const focus = useIsFocused();

  const handleResetPassword = useCallback(async () => {
    if (!email.current) {
      Toast.show({
        type: 'negative',
        props: {
          title: 'Please enter your email address.',
        },
      });
      return;
    }

    try {
      await Firebase.auth().sendPasswordResetEmail(email.current);
      Toast.show({
        type: 'positive',
        props: { title: 'Please check your email to reset your password.' },
      });
      goBack();
    } catch (e) {
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      Toast.show({
        type: 'negative',
        props: {
          title: 'Unable to reset your password.',
          description: `${err.nativeErrorMessage}`,
        },
      });
      Firebase.crashlytics().log('unable to reset password');
    }
  }, [email, goBack]);

  const handleEmailChange = useCallback((value: string) => {
    email.current = value;
  }, []);

  useEffect(() => {
    if (focus) {
      emailRef.current?.focus();
    }
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
        keyboardShouldPersistTaps="handled"
      >
        <Text
          center
          emphasis="medium"
          title="Enter your email address to receive a link to reset your password."
        />
        <Spacing padding={2} />
        <TextInput
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          onRef={emailRef}
          onSubmitEditing={handleResetPassword}
          placeholder="Email address"
          returnKeyType="send"
          textContentType="username"
          value={email.current}
        />
        <Spacing padding={2} />
        <Button
          center
          color="accent"
          emphasis="high"
          onPress={handleResetPassword}
          title="send email"
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
});
