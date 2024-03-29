import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
  Toast,
  View,
  type TextInputReference,
} from '../../../../components';
import {
  Firebase,
  type StackNavigationProperty,
  useIsFocused,
  useNavigation,
  type FirebaseAuthTypes,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { Collections, type Preferences, type User } from '../../data';
import { type UnAuthStackRoutes } from '../../types';
import { SocialAuth } from './SocialAuth';

const initialReference = { email: '', password: '' };
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
  for (let index = 0; index < 96; index++) {
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

  if (query.size === 0) {
    await Collections.preferences.add(data);
    return;
  }
  await Collections.preferences.doc(query.docs[0].id).set(data);
};

export const SignUp = () => {
  const { goBack, navigate } =
    useNavigation<StackNavigationProperty<UnAuthStackRoutes, 'sign-up'>>();
  const emailReference = useRef<TextInputReference>(null);
  const passwordReference = useRef<TextInputReference>(null);
  const form = useRef(initialReference);
  const [state, setState] = useState(initialState);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';
  const focus = useIsFocused();
  const disabled = state.loading;
  const timezone =
    useAppSelector((root) => root.device.localization?.timeZone) ?? '';

  const handleErrorToast = useCallback((error: unknown, message: string) => {
    const firebaseError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    Toast.show({
      props: {
        description: firebaseError.nativeErrorMessage,
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
    } catch (error) {
      setState((p) => ({ ...p, loading: false }));
      handleErrorToast(error, 'unable to sign up');
    }
  }, [handleErrorToast, timezone]);

  const handleSignIn = useCallback(async () => {
    const { email, password } = form.current;
    const errorMessage =
      'Please enter your email address and password before submitting.';
    if (!email || !password) {
      Toast.show({ props: { title: errorMessage }, type: 'negative' });
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
    } catch (error) {
      const firebaseError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      if (firebaseError.code === 'auth/user-not-found') {
        handleSignUp();
        return;
      }
      setState((p) => ({ ...p, loading: false }));
      handleErrorToast(error, 'unable to sign in');
    }
  }, [handleErrorToast, handleSignUp, timezone]);

  const handleForgotPassword = useCallback(() => {
    navigate('forgot-password', { email: form.current.email });
  }, [navigate]);

  const handleEyePress = useCallback(() => {
    setState((p) => ({ ...p, eye: !p.eye }));
    passwordReference.current?.focus();
  }, []);

  const handleFormChange = useCallback(
    (key: keyof typeof initialReference) => (value: string) => {
      form.current = { ...form.current, [key]: value };
    },
    [],
  );

  const handleSubmit = useCallback(
    (key: keyof typeof initialReference) => () => {
      if (key === 'email') passwordReference.current?.focus();
      if (key === 'password') handleSignIn();
    },
    [handleSignIn],
  );

  useEffect(() => {
    if (!focus) {
      form.current = initialReference;
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
          paddingHorizontal: spacing(10),
          paddingVertical: spacing(2),
        }}
      >
        <View>
          <Text
            center
            emphasis="medium"
            title="Enter your credential to continue."
          />
          <Spacing padding={spacing(2)} />
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            backgroundColor="secondary"
            blurOnSubmit={false}
            editable={!disabled}
            keyboardType="email-address"
            onChangeText={handleFormChange('email')}
            onRef={emailReference}
            onSubmitEditing={handleSubmit('email')}
            placeholder="Email address"
            returnKeyType="next"
            textContentType="username"
            value=""
          />
          <Spacing padding={spacing(2)} />
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
            onRef={passwordReference}
            onSubmitEditing={handleSubmit('password')}
            placeholder="Password"
            returnKeyType="done"
            secureTextEntry={!state.eye}
            textContentType="password"
            value=""
          />
          <Spacing padding={spacing(2)} />
          <Button
            center
            color="accent"
            disabled={disabled}
            emphasis="high"
            onPress={handleSignIn}
            title="sign up"
          />
          <Spacing padding={spacing(2)} />
          <Button
            center
            color="secondary"
            disabled={disabled}
            emphasis="medium"
            onPress={handleForgotPassword}
            title="forgot password"
          />
        </View>
        <SocialAuth disabled={disabled} />
      </KeyboardAwareScrollView>
    </Screen>
  );
};
