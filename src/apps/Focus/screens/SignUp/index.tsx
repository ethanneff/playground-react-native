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
  type FirebaseAuthTypes,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { getLandscapeOrientation, useRootSelector } from '../../../../redux';
import { Collections, type Preferences, type User } from '../../data';
import { type UnAuthStackRoutes } from '../../types';
import { SocialAuth } from './SocialAuth';

const initialRef = { email: '', password: '' };
const initialState = { eye: false, loading: false };

const createUser = async (user: FirebaseAuthTypes.User) => {
  const data: User = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    id: user.uid,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
  };

  await Collections.users.doc(user.uid).set(data);
};

const createUserPreferences = async (
  user: FirebaseAuthTypes.User,
  timezone: string,
) => {
  let availability = '';
  for (let i = 0; i < 96; i++) {
    availability += '0';
  }
  const data: Preferences = {
    availability,
    cadence: 60,
    notifications: ['mobile'],
    theme: 'light',
    timezone,
    uid: user.uid,
  };

  const query = await Collections.preferences
    .where('uid', '==', user.uid)
    .get();

  if (!query.size) {
    await Collections.preferences.add(data);
    return;
  }
  await Collections.preferences.doc(query.docs[0].id).set(data);
};

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
  const timezone =
    useRootSelector((root) => root.device.localization?.timeZone) ?? '';

  const handleErrorToast = useCallback((e: unknown, message: string) => {
    const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
    Toast.show({
      props: {
        description: `${err.nativeErrorMessage}`,
        title: 'Unable to login.',
      },
      type: 'negative',
    });
    Firebase.crashlytics().log(message);
  }, []);

  const handleSignUp = useCallback(async () => {
    const { email, password } = form.current;
    try {
      const { user } = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await createUser(user);
      await createUserPreferences(user, timezone);
    } catch (e) {
      setState((p) => ({ ...p, loading: false }));
      handleErrorToast(e, 'unable to sign up');
    }
  }, [handleErrorToast, timezone]);

  const handleSignIn = useCallback(async () => {
    const { email, password } = form.current;
    const error =
      'Please enter your email address and password before submitting.';
    if (!email || !password) {
      Toast.show({ props: { title: error }, type: 'negative' });
      return;
    }
    setState((p) => ({ ...p, loading: true }));
    try {
      const { user } = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password,
      );
      await createUser(user);
      await createUserPreferences(user, timezone);
    } catch (e) {
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      if (err.code === 'auth/user-not-found') {
        handleSignUp();
        return;
      }
      setState((p) => ({ ...p, loading: false }));
      handleErrorToast(e, 'unable to sign in');
    }
  }, [handleErrorToast, handleSignUp, timezone]);

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
          icons={[{ focus: true, name: eyeIcon, onPress: handleEyePress }]}
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
