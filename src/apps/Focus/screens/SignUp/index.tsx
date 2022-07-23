import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Platform, Text as OriginalText } from 'react-native';
import {
  Button,
  Icon,
  IconName,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
  TextInputRef,
  Toast,
  TouchableOpacity,
  View,
} from '../../../../components';
import { Firebase, FirebaseAuthTypes } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { getLandscapeOrientation, useRootSelector } from '../../../../redux';
import { UnAuthStackRoutes } from '../../types';

type Props = {
  icon: IconName;
  onPress: () => void;
  title: string;
};

const LoginButton = memo(function LoginButton({ onPress, icon, title }: Props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: colors.border.secondary,
        borderWidth: 1,
        padding: spacing(1),
        borderRadius: spacing(1),
      }}
    >
      <Icon
        color="primaryA"
        name={icon}
      />
      <Spacing padding={1} />
      <Text
        color="secondary"
        title={title}
        type="button"
      />
    </TouchableOpacity>
  );
});

const initialRef = { email: '', password: '' };
const initialState = { eye: false, completeForm: false };

const SocialAuth = () => {
  const handleMissingCallback = useCallback(() => {}, []);
  const landscape = useRootSelector(getLandscapeOrientation);

  const { goBack, navigate } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'sign-up'>>();

  const handleTerms = useCallback(() => {
    navigate('terms');
  }, [navigate]);

  const handlePrivacy = useCallback(() => {
    navigate('privacy');
  }, [navigate]);

  return (
    <View
      style={{
        paddingHorizontal: spacing(landscape ? 0 : 8),
        paddingVertical: spacing(landscape ? 0 : 4),
        paddingTop: spacing(landscape ? 8 : 0),
      }}
    >
      <Spacing padding={2} />
      <LoginButton
        icon="google"
        onPress={handleMissingCallback}
        title="Sign Up with Google"
      />
      <Spacing padding={2} />
      <LoginButton
        icon="facebook"
        onPress={handleMissingCallback}
        title="Sign Up with Facebook"
      />
      {Platform.OS === 'ios' && (
        <>
          <Spacing padding={2} />
          <LoginButton
            icon="apple"
            onPress={handleMissingCallback}
            title="Sign Up with Apple"
          />
        </>
      )}
      <Spacing padding={2} />
      <OriginalText style={{ textAlign: 'center' }}>
        <Text
          emphasis="medium"
          title="By signing in to Progression, you agree to our "
        />
        <Text
          color="accent"
          onPress={handleTerms}
          title="Terms"
        />
        <Text
          emphasis="medium"
          title=" and "
        />
        <Text
          color="accent"
          onPress={handlePrivacy}
          title="Privacy Policy"
        />
        <Text
          emphasis="medium"
          title="."
        />
      </OriginalText>
    </View>
  );
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

    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      const err = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      if (err.code === 'auth/user-not-found') {
        handleSignUp();
        return;
      }
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
      if (key === 'password') handleSignUp();
    },
    [handleSignUp],
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
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
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
          autoCorrect={false}
          backgroundColor="secondary"
          blurOnSubmit={false}
          icons={[{ name: eyeIcon, onPress: handleEyePress, focus: true }]}
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
          emphasis="high"
          onPress={handleSignIn}
          title="sign up"
        />
        <Spacing padding={2} />
        <Button
          center
          color="secondary"
          emphasis="medium"
          onPress={handleForgotPassword}
          title="forgot password"
        />
        {landscape ? <SocialAuth /> : null}
      </KeyboardAwareScrollView>
      {landscape ? null : <SocialAuth />}
    </Screen>
  );
});
