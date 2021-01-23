import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useState} from 'react';
import {Button, Modal, TextInput} from '../../../../components';
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

  const onSubmit = useCallback(() => goBack(), [goBack]);
  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onFormChange = useCallback(
    (key: keyof typeof form) => (val: string) =>
      setForm((p) => ({...p, [key]: val})),
    [],
  );
  const navBack = useCallback(() => goBack(), [goBack]);

  return !focus ? null : (
    <Modal backgroundColor={color.surface} onBackgroundPress={navWelcome}>
      <ModalHeader onRightPress={navBack} title="Reset password" />
      <TextInput
        onChangeText={onFormChange('email')}
        placeholder="Email address"
        style={{padding: config.padding(2)}}
        value={form.email}
      />
      <Button
        center
        color="primary"
        disable={!form.email.length}
        emphasis="high"
        onPress={onSubmit}
        title="Reset"
      />
    </Modal>
  );
});
