import React, {memo, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {
  Button,
  Icon,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from '../../components';
import {FirebaseAuthTypes, auth} from '../../conversions/Firebase';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

interface Props {
  onBackgroundPress: () => void;
}

// TODO: relocate to somewhere
interface SignInButtonProps {
  onPress: () => void;
  icon: string;
  title: string;
}
const SignInButton = memo(function SignInButton({
  onPress,
  icon,
  title,
}: SignInButtonProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: color.text,
        borderWidth: 2,
        padding: Theme.padding.p02,
        marginBottom: Theme.padding.p02,
        borderRadius: Theme.padding.p10,
      }}>
      <Icon name={icon} />
      <Text
        style={{paddingLeft: Theme.padding.p02}}
        title={title}
        type="button"
      />
    </TouchableOpacity>
  );
});

type FormState =
  | 'loading'
  | 'landing'
  | 'email'
  | 'forgot password'
  | 'phone'
  | 'phone confirm';

type State = {
  email: string;
  password: string;
  phone: string;
  phoneCode: string;
  phoneConfirmation: FirebaseAuthTypes.ConfirmationResult | null;
  state: FormState;
};

export const Login = memo(function Login({onBackgroundPress}: Props) {
  const [form, setForm] = useState<State>({
    email: '',
    password: '',
    phone: '',
    phoneCode: '',
    phoneConfirmation: null,
    state: 'loading',
  });

  const onEmail = useCallback(
    () => setForm((prev) => ({...prev, password: '', state: 'email'})),
    [],
  );
  const onForgotPassword = useCallback(
    () => setForm((prev) => ({...prev, state: 'forgot password'})),
    [],
  );
  const onLanding = useCallback(
    () =>
      setForm((prev) => ({...prev, email: '', password: '', state: 'landing'})),
    [],
  );
  const onPhone = useCallback(
    () => setForm((prev) => ({...prev, state: 'phone'})),
    [],
  );

  const onEmailChange = useCallback(
    (email: string) => setForm((prev) => ({...prev, email})),
    [],
  );
  const onPhoneChange = useCallback(
    (phone: string) => setForm((prev) => ({...prev, phone})),
    [],
  );
  const onPhoneCodeChange = useCallback(
    (phoneCode: string) => setForm((prev) => ({...prev, phoneCode})),
    [],
  );
  const onPasswordChange = useCallback(
    (password: string) => setForm((prev) => ({...prev, password})),
    [],
  );

  const onPhoneSubmit = useCallback(async () => {
    const phoneConfirmation = await auth().signInWithPhoneNumber(form.phone);
    setForm((prev) => ({...prev, state: 'phone confirm', phoneConfirmation}));
  }, [setForm, form.phone]);

  const onPhoneConfirm = useCallback(async () => {
    if (!form.phoneConfirmation) {
      console.log('missing confirmation');
      return;
    }
    try {
      await form.phoneConfirmation.confirm(form.phoneCode);
      setForm((prev) => ({...prev, state: 'landing'}));
    } catch {
      console.log('invalid code');
    }
  }, [form.phoneCode, form.phoneConfirmation]);

  const onEmailSubmit = useCallback(() => {
    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  }, [form.email, form.password]);

  const onMissingCallback = useCallback(() => undefined, []);

  const onAnonymous = useCallback(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }, []);

  const onLogout = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(() => console.log('no user to sign out'))
      .finally(() => setForm((prev) => ({...prev, state: 'landing'})));
  }, []);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return (
    <Modal onBackgroundPress={onBackgroundPress}>
      {form.state === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : form.state === 'phone confirm' ? (
        <>
          <TextInput
            keyboardType="number-pad"
            onChangeText={onPhoneCodeChange}
            placeholder="phone confirmation code"
            value={form.phoneCode}
          />
          <Button
            color="primary"
            emphasis="high"
            onPress={onPhoneConfirm}
            title="verify phone confirmation code"
          />
          <Button onPress={onPhone} title="go back" />
        </>
      ) : form.state === 'phone' ? (
        <>
          <TextInput
            keyboardType="number-pad"
            onChangeText={onPhoneChange}
            placeholder="phone"
            value={form.phone}
          />
          <Button
            color="primary"
            emphasis="high"
            onPress={onPhoneSubmit}
            title="send confirmation code"
          />
          <Button onPress={onLanding} title="go back" />
        </>
      ) : form.state === 'forgot password' ? (
        <>
          <TextInput
            keyboardType="email-address"
            onChangeText={onEmailChange}
            placeholder="email"
            textContentType="username"
            value={form.email}
          />
          <Button
            color="primary"
            emphasis="high"
            onPress={onEmailSubmit}
            title="send password reset"
          />
          <Button onPress={onEmail} title="go back" />
        </>
      ) : form.state === 'email' ? (
        <>
          <TextInput
            keyboardType="email-address"
            onChangeText={onEmailChange}
            placeholder="email"
            textContentType="username"
            value={form.email}
          />
          <TextInput
            onChangeText={onPasswordChange}
            placeholder="password"
            secureTextEntry
            textContentType="password"
            value={form.password}
          />
          <Button color="primary" emphasis="high" title="submit" />
          <Button onPress={onForgotPassword} title="forgot password" />
          <Button onPress={onLanding} title="go back" />
        </>
      ) : (
        <>
          {Platform.OS === 'ios' && (
            <SignInButton
              icon="apple"
              onPress={onMissingCallback}
              title="Continue with Apple"
            />
          )}
          <SignInButton
            icon="google"
            onPress={onMissingCallback}
            title="Continue with Google"
          />
          <SignInButton
            icon="facebook"
            onPress={onMissingCallback}
            title="Continue with Facebook"
          />
          <SignInButton
            icon="email"
            onPress={onEmail}
            title="Continue with Email"
          />
          <SignInButton
            icon="phone"
            onPress={onPhone}
            title="Continue with Phone"
          />
          <SignInButton
            icon="close"
            onPress={onAnonymous}
            title="Continue trial"
          />
        </>
      )}
    </Modal>
  );
});
