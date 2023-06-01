import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Config from 'react-native-config';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  TextInput,
  View,
  type TextInputRef,
} from '../../../../components';
import { Firebase } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';

export const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const eyeIcon = eye ? 'eye-outline' : 'eye-off-outline';
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);

  const handleFacebook = useCallback(async () => {
    setLoading(true);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) throw new Error('User cancelled the login process');
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) throw new Error('Something went wrong obtaining access token');
    const facebookCredential = Firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    Firebase.auth().signInWithCredential(facebookCredential);
  }, []);

  const handleApple = useCallback(async () => {
    setLoading(true);
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = Firebase.auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    Firebase.auth().signInWithCredential(appleCredential);
  }, []);

  const handleGoogle = useCallback(async () => {
    setLoading(true);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential =
      Firebase.auth.GoogleAuthProvider.credential(idToken);
    Firebase.auth().signInWithCredential(googleCredential);
  }, []);

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
  }, []);

  const colors = useColors();
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
            <Button
              center
              disabled={loading}
              onPress={handleApple}
              title="apple"
            />
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
