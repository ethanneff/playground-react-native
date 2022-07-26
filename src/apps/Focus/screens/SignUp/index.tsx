import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
import { getLandscapeOrientation, useRootSelector } from '../../../../redux';
import { UnAuthStackRoutes } from '../../types';
import { SocialAuth } from './SocialAuth';

const initialRef = { email: '', password: '' };
const initialState = { eye: false, loading: false };

export const SignUp = memo(function SignUp() {
  const { goBack, navigate } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'sign-up'>>();
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';
  const focus = useIsFocused();
  const landscape = useRootSelector(getLandscapeOrientation);
  const disabled = state.loading;

  const handleErrorToast = useCallback((e: unknown, message: string) => {
    const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
    Toast.show({
      type: 'negative',
      props: {
        title: 'Unable to login.',
        description: `${err.nativeErrorMessage}`,
      },
    });
    Firebase.crashlytics().log(message);
  }, []);

  const handleSignUp = useCallback(async () => {
    const { email, password } = form.current;
    try {
      await Firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setState((p) => ({ ...p, loading: false }));
      handleErrorToast(e, 'unable to sign up');
    }
  }, [handleErrorToast]);

  const handleSignIn = useCallback(async () => {
    const { email, password } = form.current;
    if (!email || !password) {
      Toast.show({
        type: 'negative',
        props: {
          title:
            'Please enter your email address and password before submitting.',
        },
      });
      return;
    }

    setState((p) => ({ ...p, loading: true }));
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;

      if (err.code === 'auth/user-not-found') {
        handleSignUp();
        return;
      }
      setState((p) => ({ ...p, loading: false }));
      handleErrorToast(e, 'unable to sign in');
    }
  }, [handleErrorToast, handleSignUp]);

  const handleForgotPassword = useCallback(() => {
    navigate('forgot-password', { email: form.current.email });
  }, [navigate]);

  const handleEyePress = useCallback(() => {
    setState((p) => ({ ...p, eye: !p.eye }));
    passwordRef.current?.focus();
  }, []);

  const handleFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = { ...form.current, [key]: val };
    },
    [],
  );

  const handleSubmit = useCallback(
    (key: keyof typeof initialRef) => () => {
      if (key === 'email') passwordRef.current?.focus();
      if (key === 'password') handleSignIn();
    },
    [handleSignIn],
  );

  useEffect(() => {
    if (!focus) {
      form.current = initialRef;
      setState(initialState);
    }
  }, [focus]);

  return (
    <Screen
      onLeftPress={goBack}
      title="Account sign up"
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
          title="Enter your credential to continue."
        />
        <Spacing padding={2} />
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
          editable={!disabled}
          keyboardType="email-address"
          onChangeText={handleFormChange('email')}
          onRef={emailRef}
          onSubmitEditing={handleSubmit('email')}
          placeholder="Email address"
          returnKeyType="next"
          textContentType="username"
          value=""
        />
        <Spacing padding={2} />
        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
          editable={!disabled}
          icons={[{ name: eyeIcon, onPress: handleEyePress, focus: true }]}
          keyboardType="default"
          onChangeText={handleFormChange('password')}
          onRef={passwordRef}
          onSubmitEditing={handleSubmit('password')}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry={!state.eye}
          textContentType="password"
          value=""
        />
        <Spacing padding={2} />
        <Button
          center
          color="accent"
          disabled={disabled}
          emphasis="high"
          onPress={handleSignIn}
          title="sign up"
        />
        <Spacing padding={2} />
        <Button
          center
          color="secondary"
          disabled={disabled}
          emphasis="medium"
          onPress={handleForgotPassword}
          title="forgot password"
        />
        {landscape ? <SocialAuth disabled={disabled} /> : null}
      </KeyboardAwareScrollView>
      {landscape ? null : <SocialAuth disabled={disabled} />}
    </Screen>
  );
});
