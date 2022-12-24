import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, TextInput, TextInputRef } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useRootDispatch } from '../../../../redux';
import { ModalHeader } from '../../components';
import { createItem, loadUser } from '../../models';
import { LandingStackRoutes } from '../../navigationTypes';
import { getDefaultUserTemplate } from '../../utils';

const initialRef = { email: '', password: '' };
const initialState = { completeForm: false, eye: false, loading: false };

export const LogIn = memo(function LogIn() {
  const colors = useColors();
  const dispatch = useRootDispatch();
  const focus = useIsFocused();
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<LandingStackRoutes>>();

  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onSecondary = useCallback(() => navigate('password-reset'), [navigate]);
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onEye = useCallback(() => {
    setState((p) => ({ ...p, eye: !p.eye }));
    passwordRef.current?.focus();
  }, []);

  const onSubmit = useCallback(() => {
    if (!state.completeForm) return;
    const { items, user } = getDefaultUserTemplate();
    items.forEach((item) => dispatch(createItem(item)));
    dispatch(loadUser({ ...user, email: form.current.email }));
  }, [dispatch, state.completeForm]);

  const onFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = { ...form.current, [key]: val };
      const { email, password } = form.current;
      const completeForm = email.length > 0 && password.length > 0;
      setState((p) => ({ ...p, completeForm }));
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
        editable={!state.loading}
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
        blurOnSubmit={false}
        editable={!state.loading}
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
        onPress={onSecondary}
        title="Forgot password?"
      />
      <Button
        center
        color="accent"
        disabled={!state.completeForm}
        emphasis="high"
        onPress={onSubmit}
        title="Log In"
      />
    </Modal>
  ) : null;
});
