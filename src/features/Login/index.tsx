import React, {memo, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import {
  Button,
  Icon,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from '../../components';
import {useColor} from '../../hooks';
import {Config, Theme} from '../../utils';
import {FirebaseAuthTypes, auth} from '../../conversions/Firebase';

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
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: color.text,
        borderWidth: 2,
        padding: Theme.padding.p02,
        marginBottom: Theme.padding.p02,
        borderRadius: Theme.padding.p10,
      }}
      onPress={onPress}>
      <Icon name={icon} />
      <Text
        title={title}
        style={{paddingLeft: Theme.padding.p02}}
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

  const onPhoneConfirm = async () => {
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
  };

  const onEmailSubmit = () => {
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
  };

  const onAnonymous = () => {
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
  };

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
        <View>
          <TextInput
            placeholder="phone confirmation code"
            keyboardType="number-pad"
            value={form.phoneCode}
            onChangeText={onPhoneCodeChange}
          />
          <Button
            title="verify phone confirmation code"
            color="primary"
            emphasis="high"
            onPress={onPhoneConfirm}
          />
          <Button title="go back" onPress={onPhone} />
        </View>
      ) : form.state === 'phone' ? (
        <View>
          <TextInput
            placeholder="phone"
            keyboardType="number-pad"
            value={form.phone}
            onChangeText={onPhoneChange}
          />
          <Button
            title="send confirmation code"
            color="primary"
            emphasis="high"
            onPress={onPhoneSubmit}
          />
          <Button title="go back" onPress={onLanding} />
        </View>
      ) : form.state === 'forgot password' ? (
        <View>
          <TextInput
            placeholder="email"
            textContentType="username"
            keyboardType="email-address"
            value={form.email}
            onChangeText={onEmailChange}
          />
          <Button
            title="send password reset"
            color="primary"
            emphasis="high"
            onPress={onEmailSubmit}
          />
          <Button title="go back" onPress={onEmail} />
        </View>
      ) : form.state === 'email' ? (
        <View>
          <TextInput
            placeholder="email"
            textContentType="username"
            keyboardType="email-address"
            value={form.email}
            onChangeText={onEmailChange}
          />
          <TextInput
            placeholder="password"
            textContentType="password"
            secureTextEntry
            value={form.password}
            onChangeText={onPasswordChange}
          />
          <Button title="submit" color="primary" emphasis="high" />
          <Button title="forgot password" onPress={onForgotPassword} />
          <Button title="go back" onPress={onLanding} />
        </View>
      ) : (
        <View>
          {Platform.OS === Config.os.ios && (
            <SignInButton
              title="Continue with Apple"
              icon="apple"
              onPress={() => undefined}
            />
          )}
          <SignInButton
            title="Continue with Google"
            icon="google"
            onPress={() => undefined}
          />
          <SignInButton
            title="Continue with Facebook"
            icon="facebook"
            onPress={() => undefined}
          />
          <SignInButton
            title="Continue with Email"
            icon="email"
            onPress={onEmail}
          />
          <SignInButton
            title="Continue with Phone"
            icon="phone"
            onPress={onPhone}
          />
          <SignInButton
            title="Continue trial"
            icon="close"
            onPress={onAnonymous}
          />
        </View>
      )}
    </Modal>
  );
});
