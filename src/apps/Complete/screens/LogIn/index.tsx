import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput} from 'react-native';
import {Button, Modal, TextInput} from '../../../../components';
import {padding, useColor} from '../../../../features';
import {useRootDispatch} from '../../../../redux';
import {ModalHeader} from '../../components';
import {createItem, loadUser} from '../../models';
import {LandingStackRoutes} from '../../navigationTypes';
import {getDefaultUserTemplate} from '../../utils';

const initialRef = {email: '', password: ''};
const initialState = {eye: false, completeForm: false};

export const LogIn = memo(function LogIn() {
  const color = useColor();
  const dispatch = useRootDispatch();
  const focus = useIsFocused();
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const {goBack, navigate} =
    useNavigation<StackNavigationProp<LandingStackRoutes>>();

  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onSecondary = useCallback(() => navigate('password-reset'), [navigate]);
  const emailRef = useRef<OriginalTextInput | null>(null);
  const passwordRef = useRef<OriginalTextInput | null>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onEye = useCallback(() => {
    setState(p => ({...p, eye: !p.eye}));
    passwordRef.current?.focus();
  }, []);

  const onSubmit = useCallback(() => {
    if (!state.completeForm) return;
    const {user, items} = getDefaultUserTemplate();
    items.map(item => dispatch(createItem(item)));
    dispatch(loadUser({...user, email: form.current.email}));
  }, [dispatch, state.completeForm]);

  const onFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = {...form.current, [key]: val};
      const {email, password} = form.current;
      const completeForm = email.length > 0 && password.length > 0;
      setState(p => ({...p, completeForm}));
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

  return !focus ? null : (
    <Modal
      backgroundColor={color.background.secondary}
      onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={goBack} title="Log in" />
      <TextInput
        autoCorrect={false}
        blurOnSubmit={false}
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
        blurOnSubmit={false}
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
  );
});
