import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Config from 'react-native-config';
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  TextInput,
  Toast,
  View,
  type TextInputRef,
} from '../../../../components';
import { Firebase, type FirebaseAuthTypes } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { useAppSelector } from '../../../../redux';

export const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const eyeIcon = eye ? 'eye-outline' : 'eye-off-outline';
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const isAppleDevice = useAppSelector(
    (state) => state.device.details?.manufacturer === 'Apple',
  );
  const colors = useColors();

  const handleError = useCallback((e: unknown) => {
    const description =
      e instanceof Error
        ? e.message
        : (e as FirebaseAuthTypes.NativeFirebaseAuthError).nativeErrorMessage;
    Toast.show({
      props: {
        description,
        title: 'Unable to sign in',
      },
      type: 'negative',
    });
  }, []);

  const handleFacebook = useCallback(async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const facebookCredential = Firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      await Firebase.auth().signInWithCredential(facebookCredential);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const handleApple = useCallback(async () => {
    try {
      setLoading(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
      const { identityToken, nonce, user } = appleAuthRequestResponse;
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState !== appleAuth.State.AUTHORIZED) {
        throw new Error('Apple Sign-In failed - not authorized');
      }
      const appleCredential = Firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      await Firebase.auth().signInWithCredential(appleCredential);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const handleGoogle = useCallback(async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential =
        Firebase.auth.GoogleAuthProvider.credential(idToken);
      await Firebase.auth().signInWithCredential(googleCredential);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const handleEmail = useCallback(() => {
    setLoading(true);
  }, []);

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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_SIGN_IN,
    });
    Settings.setAppID(Config.FACEBOOK_APP_ID ?? '');
  }, []);

  return (
    <Screen
      dropShadow
      title="Sign In"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing(4),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <Spacing padding={spacing(2)}>
            {isAppleDevice ? (
              <Button
                center
                disabled={loading}
                onPress={handleApple}
                title="apple"
              />
            ) : null}
            <Button
              center
              disabled={loading}
              onPress={handleFacebook}
              title="facebook"
            />
            <Button
              center
              disabled={loading}
              onPress={handleGoogle}
              title="google"
            />
          </Spacing>
        </Card>
        <Spacing padding={spacing(2)} />
        <Card>
          <Spacing padding={spacing(2)}>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="email-address"
              onChangeText={handleFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={handleFormSubmit('email')}
              placeholder="Email address"
              returnKeyType="next"
              textContentType="username"
              value={form.email}
            />
            <Spacing padding={spacing(2)} />
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
              disabled={loading}
              onPress={handleEmail}
              title="sign in"
            />
            <View
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                center
                disabled={loading}
                onPress={handleEmail}
                title="forgot password"
              />
              <Button
                center
                disabled={loading}
                onPress={handleEmail}
                title="create account "
              />
            </View>
          </Spacing>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
