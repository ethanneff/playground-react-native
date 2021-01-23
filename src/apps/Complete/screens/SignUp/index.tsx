import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useState} from 'react';
import {Button, Modal, Text, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootDispatch} from '../../../../utils';
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

  return !focus ? null : (
    <Modal backgroundColor={color.surface} onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={navBack} title="Sign up" />
      <TextInput
        onChangeText={onFormChange('email')}
        placeholder="Email address"
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
