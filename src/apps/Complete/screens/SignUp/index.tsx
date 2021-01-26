import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput} from 'react-native';
import {Button, Modal, Text, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config, useRootDispatch} from '../../../../utils';
import {ModalHeader} from '../../components';
import {createItem, createUser} from '../../models';
import {LandingStackParams} from '../../navigation-types';
import {getDefaultUserTemplate} from '../../utils';

const passwordError = 'Password is too short';
const initialState = {email: '', password: '', passwordError: false};

export const SignUp = memo(function SignUp() {
  const color = useColor();
  const dispatch = useRootDispatch();
  const focus = useIsFocused();
  const [form, setForm] = useState(initialState);
  const {goBack, navigate} = useNavigation<
    StackNavigationProp<LandingStackParams>
  >();
  const navBack = useCallback(() => goBack(), [goBack]);
  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onSecondary = useCallback(() => navigate('log-in'), [navigate]);
  const completeForm =
    form.email.length && form.password.length && !form.passwordError;
  const emailRef = useRef<OriginalTextInput | null>(null);

  const onSubmit = useCallback(() => {
    const {user, items} = getDefaultUserTemplate();
    items.map((item) => dispatch(createItem(item)));
    dispatch(createUser({...user, email: form.email}));
  }, [dispatch, form.email]);

  const onFormChange = useCallback(
    (key: keyof typeof initialState) => (val: string) => {
      setForm((p) => ({
        ...p,
        [key]: val,
        passwordError: key === 'password' && val.length > 0 && val.length < 10,
      }));
    },
    [],
  );

  useEffect(() => {
    if (focus && emailRef.current) emailRef.current.focus();
    if (!focus) setForm(initialState);
  }, [focus]);

  return !focus ? null : (
    <Modal backgroundColor={color.surface} onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={navBack} title="Sign up" />
      <TextInput
        onChangeText={onFormChange('email')}
        onRef={emailRef}
        placeholder="Email address"
        style={{marginBottom: config.padding(4)}}
        value={form.email}
      />
      <TextInput
        onChangeText={onFormChange('password')}
        placeholder="Create password"
        value={form.password}
      />
      <Text
        color="danger"
        invisible={!form.passwordError}
        title={passwordError}
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
        disable={!completeForm}
        emphasis="high"
        onPress={onSubmit}
        title="Sign up"
      />
    </Modal>
  );
});
