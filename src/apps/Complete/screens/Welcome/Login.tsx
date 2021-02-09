import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Platform, TextInput as OriginalTextInput} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Icon,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from '../../../../components';
import {useAuth, useColor} from '../../../../hooks';
import {config} from '../../../../utils';
import {ModalHeader} from '../../components/';

interface Props {
  onBackgroundPress: () => void;
  showFacebook?: boolean;
  showGoogle?: boolean;
  showApple?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showAnonymous?: boolean;
  onSuccess: (user: FirebaseAuthTypes.User | null) => void;
}

// TODO: relocate to somewhere
interface SignInButtonProps {
  onPress: () => void;
  icon: string;
  title: string;
  margin?: boolean;
}

const SignInButton = memo(function SignInButton({
  onPress,
  icon,
  title,
  margin,
}: SignInButtonProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: color.secondary,
        borderWidth: 1,
        padding: config.padding(2),
        marginBottom: config.padding(margin ? 4 : 0),
        borderRadius: config.sizing.borderRadius,
      }}>
      <Icon name={icon} />
      <Text
        style={{paddingLeft: config.padding(2)}}
        title={title}
        type="button"
      />
    </TouchableOpacity>
  );
});

type Screen =
  | 'loading'
  | 'landing'
  | 'signUp'
  | 'logIn'
  | 'forgotPassword'
  | 'phone'
  | 'phoneCode'
  | 'anonymous';

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
  eye: boolean;
  completeForm: boolean;
  passwordError: boolean;
  screen: Screen;
};

const initialState: State = {
  eye: false,
  completeForm: false,
  passwordError: false,
  screen: 'landing',
};

export const Login = memo(function Login({
  onBackgroundPress,
  showFacebook,
  showGoogle,
  showApple,
  showPhone,
  showEmail,
  showAnonymous,
  onSuccess,
}: Props) {
  const {
    initializing,
    user,
    error,
    loading,
    onErrorClear,
    onApple,
    onGoogle,
    onFacebook,
    onPhoneConfirm,
    onPhone,
    onEmail,
    onPasswordReset,
    onAnonymous,
  } = useAuth();
  const color = useColor();
  const successful = useRef(false);
  const form = useRef<Ref>(initialRef);
  const [state, setState] = useState<State>(initialState);
  const emailRef = useRef<OriginalTextInput | null>(null);
  const passwordRef = useRef<OriginalTextInput | null>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onFormChange = useCallback(
    (key: keyof Ref) => (val: string) => {
      form.current = {...form.current, [key]: val};
    },
    [],
  );

  const onPhonePress = useCallback(() => {
    onPhone(form.current.phone);
  }, [onPhone]);

  const onEye = useCallback(() => {
    setState((p) => ({...p, eye: !p.eye}));
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
    (screen: Screen) => () => setState((p) => ({...p, screen})),
    [],
  );

  useEffect(() => {
    if (user && !successful.current) {
      onSuccess(user);
      successful.current = true;
    }
  }, [onSuccess, user]);

  return (
    <Modal onBackgroundPress={onBackgroundPress} showOverlay>
      <>
        {error && <Text center color="danger" title={error} />}
        {state.screen === 'loading' || initializing ? (
          <ActivityIndicator />
        ) : state.screen === 'phoneCode' ? (
          <>
            <TextInput
              keyboardType="number-pad"
              onChangeText={onFormChange('phoneCode')}
              placeholder="phone confirmation code"
            />
            <Button
              color="primary"
              emphasis="high"
              onPress={onPhoneConfirm(form.current.phoneCode)}
              title="verify phone confirmation code"
            />
            <Button onPress={onScreenChange('landing')} title="go back" />
          </>
        ) : state.screen === 'phone' ? (
          <>
            <ModalHeader
              onRightPress={onScreenChange('landing')}
              title="Phone Confirmation"
            />
            <TextInput
              autoCorrect={false}
              blurOnSubmit={false}
              keyboardType="number-pad"
              onChangeText={onFormChange('phone')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('phone')}
              placeholder="Phone number"
              returnKeyType="send"
              style={{marginBottom: config.padding(4)}}
              value=""
            />
            <Button
              center
              color="primary"
              emphasis="high"
              onPress={onPhonePress}
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
              style={{paddingBottom: config.padding(4)}}
              title="Please enter the email address associated with your account."
            />
            <Text
              center
              style={{paddingBottom: config.padding(4)}}
              title="We'll send you an email with your login email as well as a password reset instructions."
            />
            <TextInput
              autoCorrect={false}
              blurOnSubmit={false}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('email')}
              placeholder="Email address"
              returnKeyType="send"
              style={{marginBottom: config.padding(4)}}
              textContentType="username"
              value=""
            />
            <Button
              center
              color="primary"
              emphasis="high"
              onPress={onPasswordReset(form.current.email)}
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
              autoCorrect={false}
              blurOnSubmit={false}
              editable={!loading}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('email')}
              placeholder="Email address"
              returnKeyType="next"
              style={{marginBottom: config.padding(4)}}
              textContentType="username"
              value=""
            />
            <TextInput
              autoCorrect={false}
              blurOnSubmit={false}
              editable={!loading}
              icons={[{name: eyeIcon, onPress: onEye, focus: true}]}
              onChangeText={onFormChange('password')}
              onRef={passwordRef}
              onSubmitEditing={onSubmitEditing('password')}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={!state.eye}
              style={{marginBottom: config.padding(4)}}
              textContentType="password"
              value=""
            />
            <Button
              buttonStyle={{marginBottom: config.padding(4)}}
              center
              color="primary"
              disable={loading}
              lowercase
              onPress={onScreenChange('logIn')}
              title="Already have an account?"
            />
            <Button
              center
              color="primary"
              disable={loading}
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
              backgroundColor={color.surface}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              placeholder="email"
              style={{marginBottom: config.padding(4)}}
              textContentType="username"
            />
            <TextInput
              backgroundColor={color.surface}
              onChangeText={onFormChange('password')}
              placeholder="password"
              secureTextEntry
              style={{marginBottom: config.padding(4)}}
              textContentType="password"
            />
            <Button
              buttonStyle={{marginBottom: config.padding(4)}}
              center
              color="primary"
              lowercase
              onPress={onScreenChange('forgotPassword')}
              title="Forgot password?"
            />
            <Button
              center
              color="primary"
              emphasis="high"
              onPress={onEmail(form.current.email, form.current.password)}
              title="Log in"
            />
          </>
        ) : (
          <>
            <ModalHeader onRightPress={onBackgroundPress} title="Get Started" />
            {(Platform.OS === 'ios' || showApple) && (
              <SignInButton
                icon="apple"
                margin
                onPress={onApple}
                title="Continue with Apple"
              />
            )}
            {showGoogle && (
              <SignInButton
                icon="google"
                margin
                onPress={onGoogle}
                title="Continue with Google"
              />
            )}
            {showFacebook && (
              <SignInButton
                icon="facebook"
                margin
                onPress={onFacebook}
                title="Continue with Facebook"
              />
            )}
            {showEmail && (
              <SignInButton
                icon="email"
                margin
                onPress={onScreenChange('signUp')}
                title="Continue with Email"
              />
            )}
            {showPhone && (
              <SignInButton
                icon="phone"
                margin
                onPress={onScreenChange('phone')}
                title="Continue with Phone"
              />
            )}
            {showAnonymous && (
              <SignInButton
                icon="account"
                onPress={onAnonymous}
                title="Continue Anonymously"
              />
            )}
          </>
        )}
      </>
    </Modal>
  );
});
