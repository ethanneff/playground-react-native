import { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  Button,
  Icon,
  Loader,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type IconName,
  type TextInputRef,
} from '../../../../components';
import { spacing, useAuth } from '../../../../features';
import { ModalHeader } from '../../components';

type Props = {
  onBackgroundPress: () => void;
  onSuccess: (user: FirebaseAuthTypes.User | null) => void;
  showAnonymous?: boolean;
  showApple?: boolean;
  showEmail?: boolean;
  showFacebook?: boolean;
  showGoogle?: boolean;
  showPhone?: boolean;
};

// TODO: relocate to somewhere
type SignInButtonProps = {
  icon: IconName;
  margin?: boolean;
  onPress: () => void;
  title: string;
};

const SignInButton = memo(function SignInButton({
  icon,
  margin,
  onPress,
  title,
}: SignInButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: spacing(margin ? 4 : 0),
      }}
    >
      <View
        alignItems="center"
        alignSelf="center"
        flexDirection="row"
        padding={spacing(2)}
      >
        <Icon name={icon} />
        <Text
          style={{ paddingLeft: spacing(2) }}
          title={title}
          type="button"
        />
      </View>
    </TouchableOpacity>
  );
});

type Screen =
  | 'anonymous'
  | 'forgotPassword'
  | 'landing'
  | 'loading'
  | 'logIn'
  | 'phone'
  | 'phoneCode'
  | 'signUp';

type Ref = {
  email: string;
  password: string;
  phone: string;
  phoneCode: string;
};

const initialRef: Ref = {
  email: '',
  password: '',
  phone: '',
  phoneCode: '',
};

type State = {
  completeForm: boolean;
  error: string | null;
  eye: boolean;
  passwordError: boolean;
  screen: Screen;
};

const initialState: State = {
  completeForm: false,
  error: null,
  eye: false,
  passwordError: false,
  screen: 'landing',
};

export const Login = memo(function Login({
  onBackgroundPress,
  onSuccess,
  showAnonymous,
  showApple,
  showEmail,
  showFacebook,
  showGoogle,
  showPhone,
}: Props) {
  const {
    onAnonymous,
    onApple,
    onEmail,
    onFacebook,
    onGoogle,
    onPasswordReset,
    onPhone,
    onPhoneConfirm,
    response,
  } = useAuth();
  const { error, type, user } = response;
  const loading = type === 'loading';
  const successful = useRef(false);
  const form = useRef<Ref>(initialRef);
  const [state, setState] = useState<State>(initialState);
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onFormChange = useCallback(
    (key: keyof Ref) => (val: string) => {
      form.current = { ...form.current, [key]: val };
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    onPhoneConfirm(form.current.phoneCode);
  }, [onPhoneConfirm]);

  const handlePhone = useCallback(() => {
    onPhone(form.current.phone);
  }, [onPhone]);
  const handleReset = useCallback(() => {
    onPasswordReset(form.current.email);
  }, [onPasswordReset]);

  const onEye = useCallback(() => {
    setState((p) => ({ ...p, eye: !p.eye }));
    passwordRef.current?.focus();
  }, []);

  const onSubmitEditing = useCallback(
    (key: keyof typeof initialRef) => () => {
      if (key === 'email') passwordRef.current?.focus();
      if (key === 'password')
        onEmail(form.current.email, form.current.password);
    },
    [onEmail],
  );

  const onScreenChange = useCallback(
    (screen: Screen) => () => {
      setState((p) => ({ ...p, screen }));
    },
    [],
  );

  useEffect(() => {
    if (user && !successful.current) {
      onSuccess(user);
      successful.current = true;
    }
  }, [onSuccess, user]);

  return (
    <Modal
      onBackgroundPress={onBackgroundPress}
      showOverlay
    >
      <>
        {error ? (
          <Text
            center
            color="negative"
            title={error}
          />
        ) : null}
        {state.screen === 'loading' || type === 'initializing' ? (
          <Loader />
        ) : state.screen === 'phoneCode' ? (
          <>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable
              keyboardType="number-pad"
              onChangeText={onFormChange('phoneCode')}
              onSubmitEditing={handleConfirm}
              placeholder="phone confirmation code"
              returnKeyType="done"
              textContentType="none"
              value=""
            />
            <Button
              color="accent"
              emphasis="high"
              onPress={handleConfirm}
              title="verify phone confirmation code"
            />
            <Button
              onPress={onScreenChange('landing')}
              title="go back"
            />
          </>
        ) : state.screen === 'phone' ? (
          <>
            <ModalHeader
              onRightPress={onScreenChange('landing')}
              title="Phone Confirmation"
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="number-pad"
              onChangeText={onFormChange('phone')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('phone')}
              placeholder="Phone number"
              returnKeyType="send"
              style={{ marginBottom: spacing(4) }}
              textContentType="none"
              value=""
            />
            <Button
              center
              color="accent"
              emphasis="high"
              onPress={handlePhone}
              title="send confirmation code"
            />
          </>
        ) : state.screen === 'forgotPassword' ? (
          <>
            <ModalHeader
              onRightPress={onScreenChange('logIn')}
              title="Reset password"
            />
            <Text
              center
              style={{ paddingBottom: spacing(4) }}
              title="Please enter the email address associated with your account."
            />
            <Text
              center
              style={{ paddingBottom: spacing(4) }}
              title="We'll send you an email with your login email as well as a password reset instructions."
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('email')}
              placeholder="Email address"
              returnKeyType="send"
              style={{ marginBottom: spacing(4) }}
              textContentType="username"
              value=""
            />
            <Button
              center
              color="accent"
              emphasis="high"
              onPress={handleReset}
              title="Reset password"
            />
          </>
        ) : state.screen === 'signUp' ? (
          <>
            <ModalHeader
              onRightPress={onScreenChange('landing')}
              title="Sign up"
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('email')}
              placeholder="Email address"
              returnKeyType="next"
              style={{ marginBottom: spacing(4) }}
              textContentType="username"
              value=""
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              icons={[{ focus: true, name: eyeIcon, onPress: onEye }]}
              keyboardType="default"
              onChangeText={onFormChange('password')}
              onRef={passwordRef}
              onSubmitEditing={onSubmitEditing('password')}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={!state.eye}
              style={{ marginBottom: spacing(4) }}
              textContentType="password"
              value=""
            />
            <Button
              buttonStyle={{ marginBottom: spacing(4) }}
              center
              color="accent"
              disabled={loading}
              lowercase
              onPress={onScreenChange('logIn')}
              title="Already have an account?"
            />
            <Button
              center
              color="accent"
              disabled={loading}
              emphasis="high"
              onPress={onSubmitEditing('password')}
              title="Sign up"
            />
          </>
        ) : state.screen === 'logIn' ? (
          <>
            <ModalHeader
              onRightPress={onScreenChange('signUp')}
              title="Log in"
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('email')}
              placeholder="Email address"
              returnKeyType="next"
              style={{ marginBottom: spacing(4) }}
              textContentType="username"
              value=""
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              backgroundColor="primaryA"
              blurOnSubmit={false}
              editable={!loading}
              icons={[{ focus: true, name: eyeIcon, onPress: onEye }]}
              keyboardType="default"
              onChangeText={onFormChange('password')}
              onRef={passwordRef}
              onSubmitEditing={onSubmitEditing('password')}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={!state.eye}
              style={{ marginBottom: spacing(4) }}
              textContentType="password"
              value=""
            />
            <Button
              buttonStyle={{ marginBottom: spacing(4) }}
              center
              color="accent"
              lowercase
              onPress={onScreenChange('forgotPassword')}
              title="Forgot password?"
            />
            <Button
              center
              color="accent"
              emphasis="high"
              onPress={onSubmitEditing('password')}
              title="Log in"
            />
          </>
        ) : (
          <>
            <ModalHeader
              onRightPress={onBackgroundPress}
              title="Get Started"
            />
            {Platform.OS === 'ios' || showApple ? (
              <SignInButton
                icon="apple"
                margin
                onPress={onApple}
                title="Continue with Apple"
              />
            ) : null}
            {showGoogle ? (
              <SignInButton
                icon="google"
                margin
                onPress={onGoogle}
                title="Continue with Google"
              />
            ) : null}
            {showFacebook ? (
              <SignInButton
                icon="facebook"
                margin
                onPress={onFacebook}
                title="Continue with Facebook"
              />
            ) : null}
            {showEmail ? (
              <SignInButton
                icon="email"
                margin
                onPress={onScreenChange('signUp')}
                title="Continue with Email"
              />
            ) : null}
            {showPhone ? (
              <SignInButton
                icon="phone"
                margin
                onPress={onScreenChange('phone')}
                title="Continue with Phone"
              />
            ) : null}
            {showAnonymous ? (
              <SignInButton
                icon="account"
                onPress={onAnonymous}
                title="Continue Anonymously"
              />
            ) : null}
          </>
        )}
      </>
    </Modal>
  );
});
