import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Text,
  TextInput,
  type TextInputReference,
} from '../../../../components';
import {
  type StackNavigationProperty,
  useIsFocused,
  useNavigation,
} from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { useAppDispatch } from '../../../../redux';
import { ModalHeader } from '../../components';
import { createItem, loadUser } from '../../models';
import { type LandingStackRoutes } from '../../navigationTypes';
import { getDefaultUserTemplate } from '../../utils';

const initialReference = { email: '', password: '' };
const initialState = {
  completeForm: false,
  eye: false,
  loading: false,
  passwordError: false,
};

export const SignUp = () => {
  const colors = useColors();
  const dispatch = useAppDispatch();
  const focus = useIsFocused();
  const form = useRef(initialReference);
  const [state, setState] = useState(initialState);
  const { goBack, navigate } =
    useNavigation<StackNavigationProperty<LandingStackRoutes>>();
  const navWelcome = useCallback(() => {
    navigate('welcome');
  }, [navigate]);
  const onSecondary = useCallback(() => {
    navigate('log-in');
  }, [navigate]);
  const emailReference = useRef<TextInputReference>(null);
  const passwordReference = useRef<TextInputReference>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onEye = useCallback(() => {
    setState((p) => ({ ...p, eye: !p.eye }));
    passwordReference.current?.focus();
  }, []);

  const onSubmit = useCallback(() => {
    if (!state.completeForm) return;
    setState((p) => ({ ...p, loading: true }));
    const { items, user } = getDefaultUserTemplate();
    for (const item of items) dispatch(createItem(item));
    dispatch(loadUser({ ...user, email: form.current.email }));
    setState((p) => ({ ...p, loading: false }));
  }, [dispatch, state.completeForm]);

  const onFormChange = useCallback(
    (key: keyof typeof initialReference) => (value: string) => {
      form.current = { ...form.current, [key]: value };
      const { email, password } = form.current;
      const passwordError = password.length < 10 && key === 'password';
      const completeForm = email.length > 0 && password.length >= 10;
      setState((p) => ({ ...p, completeForm, passwordError }));
    },
    [],
  );

  const onSubmitEditing = useCallback(
    (key: keyof typeof initialReference) => () => {
      if (key === 'email') passwordReference.current?.focus();
      if (key === 'password') onSubmit();
    },
    [onSubmit],
  );

  useEffect(() => {
    if (focus) {
      emailReference.current?.focus();
    } else {
      form.current = initialReference;
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
        editable={!state.loading}
        keyboardType="email-address"
        onChangeText={onFormChange('email')}
        onRef={emailReference}
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
        blurOnSubmit={false}
        editable={!state.loading}
        error={state.passwordError}
        icons={[{ focus: true, name: eyeIcon, onPress: onEye }]}
        keyboardType="default"
        onChangeText={onFormChange('password')}
        onRef={passwordReference}
        onSubmitEditing={onSubmitEditing('password')}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry={!state.eye}
        style={{ marginBottom: spacing(2) }}
        textContentType="password"
        value=""
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
};
