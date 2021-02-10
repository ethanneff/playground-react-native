import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput} from 'react-native';
import {Button, Modal, Text, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config, useRootDispatch} from '../../../../utils';
import {ModalHeader} from '../../components';
import {createItem, loadUser} from '../../models';
import {LandingStackParams} from '../../navigation-types';
import {getDefaultUserTemplate} from '../../utils';

const initialRef = {email: '', password: ''};
const initialState = {eye: false, completeForm: false, passwordError: false};

export const SignUp = memo(function SignUp() {
  const color = useColor();
  const dispatch = useRootDispatch();
  const focus = useIsFocused();
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const {goBack, navigate} = useNavigation<
    StackNavigationProp<LandingStackParams>
  >();
  const navBack = useCallback(() => goBack(), [goBack]);
  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onSecondary = useCallback(() => navigate('log-in'), [navigate]);
  const emailRef = useRef<OriginalTextInput | null>(null);
  const passwordRef = useRef<OriginalTextInput | null>(null);
  const eyeIcon = state.eye ? 'eye-outline' : 'eye-off-outline';

  const onEye = useCallback(() => {
    setState((p) => ({...p, eye: !p.eye}));
    passwordRef.current?.focus();
  }, []);

  const onSubmit = useCallback(() => {
    if (!state.completeForm) return;
    const {user, items} = getDefaultUserTemplate();
    items.map((item) => dispatch(createItem(item)));
    dispatch(loadUser({...user, email: form.current.email}));
  }, [dispatch, state.completeForm]);

  const onFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = {...form.current, [key]: val};
      const {email, password} = form.current;
      const passwordError = password.length < 10 && key === 'password';
      const completeForm = email.length > 0 && password.length >= 10;
      setState((p) => ({...p, completeForm, passwordError}));
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
    <Modal backgroundColor={color.surface} onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={navBack} title="Log in" />
      <TextInput
        autoCorrect={false}
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
        error={state.passwordError}
        icons={[{name: eyeIcon, onPress: onEye, focus: true}]}
        onChangeText={onFormChange('password')}
        onRef={passwordRef}
        onSubmitEditing={onSubmitEditing('password')}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry={!state.eye}
        style={{marginBottom: config.padding(2)}}
        textContentType="password"
        value=""
      />
      <Text
        color="danger"
        invisible={!state.passwordError}
        title="Password is too short."
      />
      <Button
        buttonStyle={{marginBottom: config.padding(4)}}
        center
        color="primary"
        lowercase
        onPress={onSecondary}
        title="Already have an account?"
      />
      <Button
        center
        color="primary"
        disable={!state.completeForm}
        emphasis="high"
        onPress={onSubmit}
        title="Sign Up"
      />
    </Modal>
  );
});
