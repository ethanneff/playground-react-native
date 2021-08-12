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
import {padding, useAuth, useColor} from '../../../../features';
import {ModalHeader} from '../../components';

type Props = {
  onBackgroundPress: () => void;
  showFacebook?: boolean;
  showGoogle?: boolean;
  showApple?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showAnonymous?: boolean;
  onSuccess: (user: FirebaseAuthTypes.User | null) => void;
};

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
        borderColor: color.background.secondary,
        borderWidth: 1,
        padding: padding(2),
        marginBottom: padding(margin ? 4 : 0),
        borderRadius: padding(2),
      }}>
      <Icon name={icon} />
      <Text style={{paddingLeft: padding(2)}} title={title} type="button" />
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
  error: string | null;
};

const initialState: State = {
  eye: false,
  error: null,
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
    response,
    onApple,
    onGoogle,
    onFacebook,
    onPhoneConfirm,
    onPhone,
    onEmail,
    onPasswordReset,
    onAnonymous,
  } = useAuth();
  const {type, error, user} = response;
  const loading = type === 'loading';
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

  const handleConfirm = useCallback(
    () => onPhoneConfirm(form.current.phoneCode),
    [onPhoneConfirm],
  );

  const handlePhone = useCallback(() => onPhone(form.current.phone), [onPhone]);
  const handleReset = useCallback(
    () => onPasswordReset(form.current.email),
    [onPasswordReset],
  );

  const onEye = useCallback(() => {
    setState(p => ({...p, eye: !p.eye}));
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
    (screen: Screen) => () => setState(p => ({...p, screen})),
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
        {error && <Text center color="negative" title={error} />}
        {state.screen === 'loading' || type === 'initalizing' ? (
          <ActivityIndicator />
        ) : state.screen === 'phoneCode' ? (
          <>
            <TextInput
              backgroundColor="secondary"
              keyboardType="number-pad"
              onChangeText={onFormChange('phoneCode')}
              placeholder="phone confirmation code"
            />
            <Button
              color="accent"
              emphasis="high"
              onPress={handleConfirm}
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
              backgroundColor="secondary"
              blurOnSubmit={false}
              keyboardType="number-pad"
              onChangeText={onFormChange('phone')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('phone')}
              placeholder="Phone number"
              returnKeyType="send"
              style={{marginBottom: padding(4)}}
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
              style={{paddingBottom: padding(4)}}
              title="Please enter the email address associated with your account."
            />
            <Text
              center
              style={{paddingBottom: padding(4)}}
              title="We'll send you an email with your login email as well as a password reset instructions."
            />
            <TextInput
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              keyboardType="email-address"
              onChangeText={onFormChange('email')}
              onRef={emailRef}
              onSubmitEditing={onSubmitEditing('email')}
              placeholder="Email address"
              returnKeyType="send"
              style={{marginBottom: padding(4)}}
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
              style={{marginBottom: padding(4)}}
              textContentType="username"
              value=""
            />
            <TextInput
              autoCorrect={false}
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!loading}
              icons={[{name: eyeIcon, onPress: onEye, focus: true}]}
              onChangeText={onFormChange('password')}
              onRef={passwordRef}
              onSubmitEditing={onSubmitEditing('password')}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={!state.eye}
              style={{marginBottom: padding(4)}}
              textContentType="password"
              value=""
            />
            <Button
              buttonStyle={{marginBottom: padding(4)}}
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
              style={{marginBottom: padding(4)}}
              textContentType="username"
              value=""
            />
            <TextInput
              autoCorrect={false}
              backgroundColor="primaryA"
              blurOnSubmit={false}
              editable={!loading}
              icons={[{name: eyeIcon, onPress: onEye, focus: true}]}
              onChangeText={onFormChange('password')}
              onRef={passwordRef}
              onSubmitEditing={onSubmitEditing('password')}
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={!state.eye}
              style={{marginBottom: padding(4)}}
              textContentType="password"
              value=""
            />
            <Button
              buttonStyle={{marginBottom: padding(4)}}
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
