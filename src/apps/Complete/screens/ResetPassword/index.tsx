import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput} from 'react-native';
import {Button, Modal, Text, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config} from '../../../../utils';
import {ModalHeader} from '../../components';
import {LandingStackParams} from '../../navigation-types';

const initialState = {email: ''};
export const ResetPassword = memo(function ResetPassword() {
  const color = useColor();
  const [form, setForm] = useState(initialState);
  const {goBack, navigate} = useNavigation<
    StackNavigationProp<LandingStackParams>
  >();
  const focus = useIsFocused();
  const emailRef = useRef<OriginalTextInput | null>(null);

  const onSubmit = useCallback(() => goBack(), [goBack]);
  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onFormChange = useCallback(
    (key: keyof typeof form) => (val: string) =>
      setForm((p) => ({...p, [key]: val})),
    [],
  );
  const navBack = useCallback(() => goBack(), [goBack]);

  useEffect(() => {
    if (focus && emailRef.current) emailRef.current.focus();
    if (!focus) setForm(initialState);
  }, [focus]);

  return !focus ? null : (
    <Modal backgroundColor={color.surface} onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={navBack} title="Password reset" />
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
        onChangeText={onFormChange('email')}
        onRef={emailRef}
        placeholder="Email address"
        style={{marginBottom: config.padding(4)}}
        value={form.email}
      />
      <Button
        center
        color="primary"
        disable={!form.email.length}
        emphasis="high"
        onPress={onSubmit}
        title="Reset password"
      />
    </Modal>
  );
});
