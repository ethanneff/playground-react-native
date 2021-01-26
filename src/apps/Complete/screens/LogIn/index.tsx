import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput} from 'react-native';
import {Button, Modal, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config, useRootDispatch} from '../../../../utils';
import {ModalHeader} from '../../components';
import {createItem, createUser} from '../../models';
import {LandingStackParams} from '../../navigation-types';
import {getDefaultUserTemplate} from '../../utils';

const initialState = {email: '', password: ''};

export const LogIn = memo(function LogIn() {
  const color = useColor();
  const dispatch = useRootDispatch();
  const focus = useIsFocused();
  const [form, setForm] = useState(initialState);
  const {goBack, navigate} = useNavigation<
    StackNavigationProp<LandingStackParams>
  >();
  const navBack = useCallback(() => goBack(), [goBack]);
  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onSecondary = useCallback(() => navigate('password-reset'), [navigate]);
  const completeForm = form.email.length > 0 && form.password.length > 0;
  const emailRef = useRef<OriginalTextInput | null>(null);

  const onSubmit = useCallback(() => {
    const {user, items} = getDefaultUserTemplate();
    items.map((item) => dispatch(createItem(item)));
    dispatch(createUser({...user, email: form.email}));
  }, [dispatch, form.email]);

  const onFormChange = useCallback(
    (key: keyof typeof initialState) => (val: string) =>
      setForm((p) => ({...p, [key]: val})),
    [],
  );

  useEffect(() => {
    if (focus && emailRef.current) emailRef.current.focus();
    if (!focus) setForm(initialState);
  }, [focus]);

  return !focus ? null : (
    <Modal backgroundColor={color.surface} onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={navBack} title="Log in" />
      <TextInput
        onChangeText={onFormChange('email')}
        onRef={emailRef}
        placeholder="Email address"
        style={{marginBottom: config.padding(4)}}
        value={form.email}
      />
      <TextInput
        onChangeText={onFormChange('password')}
        placeholder="Password"
        style={{marginBottom: config.padding(4)}}
        value={form.password}
      />
      <Button
        buttonStyle={{marginBottom: config.padding(4)}}
        center
        color="primary"
        lowercase
        onPress={onSecondary}
        title="Forgot password?"
      />
      <Button
        center
        color="primary"
        disable={!completeForm}
        emphasis="high"
        onPress={onSubmit}
        title="Log In"
      />
    </Modal>
  );
});
