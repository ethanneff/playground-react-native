import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Text,
  TextInput,
  type TextInputRef,
} from '../../../../components';
import {
  useIsFocused,
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { useRootDispatch } from '../../../../redux';
import { ModalHeader } from '../../components';
import { createItem, loadUser } from '../../models';
import { type LandingStackRoutes } from '../../navigationTypes';
import { getDefaultUserTemplate } from '../../utils';

const initialRef = { email: '', password: '' };
const initialState = {
  completeForm: false,
  eye: false,
  loading: false,
  passwordError: false,
};

export const SignUp = memo(function SignUp() {
  const colors = useColors();
  const dispatch = useRootDispatch();
  const focus = useIsFocused();
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const { goBack, navigate } =
    useNavigation<StackNavigationProp<LandingStackRoutes>>();
  const navWelcome = useCallback(() => {
    navigate('welcome');
  }, [navigate]);
  const onSecondary = useCallback(() => {
    navigate('log-in');
  }, [navigate]);
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onEye = useCallback(() => {
    setState((p) => ({ ...p, eye: !p.eye }));
    passwordRef.current?.focus();
  }, []);

  const onSubmit = useCallback(() => {
    if (!state.completeForm) return;
    setState((p) => ({ ...p, loading: true }));
    const { items, user } = getDefaultUserTemplate();
    items.forEach((item) => dispatch(createItem(item)));
    dispatch(loadUser({ ...user, email: form.current.email }));
    setState((p) => ({ ...p, loading: false }));
  }, [dispatch, state.completeForm]);

  const onFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = { ...form.current, [key]: val };
      const { email, password } = form.current;
      const passwordError = password.length < 10 && key === 'password';
      const completeForm = email.length > 0 && password.length >= 10;
      setState((p) => ({ ...p, completeForm, passwordError }));
    },
    [],
  );

  const onSubmitEditing = useCallback(
    (key: keyof typeof initialRef) => () => {
      if (key === 'email') passwordRef.current?.focus();
      if (key === 'password') onSubmit();
    },
    [onSubmit],
  );

  useEffect(() => {
    if (focus) {
      emailRef.current?.focus();
    } else {
      form.current = initialRef;
      setState(initialState);
    }
  }, [focus]);

  return focus ? (
    <Modal
      backgroundColor={colors.background.secondary}
      onBackgroundPress={navWelcome}
    >
      <ModalHeader
        onRightPress={goBack}
        title="Log in"
      />
      <TextInput
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        blurOnSubmit={false}
        defaultValue=""
        editable={!state.loading}
        keyboardType="email-address"
        onChangeText={onFormChange('email')}
        onRef={emailRef}
        onSubmitEditing={onSubmitEditing('email')}
        placeholder="Email address"
        returnKeyType="next"
        style={{ marginBottom: spacing(4) }}
        textContentType="username"
      />
      <TextInput
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        blurOnSubmit={false}
        defaultValue=""
        editable={!state.loading}
        error={state.passwordError}
        icons={[{ focus: true, name: eyeIcon, onPress: onEye }]}
        keyboardType="default"
        onChangeText={onFormChange('password')}
        onRef={passwordRef}
        onSubmitEditing={onSubmitEditing('password')}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry={!state.eye}
        style={{ marginBottom: spacing(2) }}
        textContentType="password"
      />
      <Text
        color="negative"
        invisible={!state.passwordError}
        title="Password is too short."
      />
      <Button
        buttonStyle={{ marginBottom: spacing(4) }}
        center
        color="accent"
        lowercase
        onPress={onSecondary}
        title="Already have an account?"
      />
      <Button
        center
        color="accent"
        disabled={!state.completeForm}
        emphasis="high"
        onPress={onSubmit}
        title="Sign Up"
      />
    </Modal>
  ) : null;
});
