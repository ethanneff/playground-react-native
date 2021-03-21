import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput as OriginalTextInput} from 'react-native';
import {Button, Modal, Text, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config} from '../../../../utils';
import {ModalHeader} from '../../components';
import {LandingStackParams} from '../../navigation-types';

const initialRef = {email: ''};
const initialState = {complete: false};
export const PasswordReset = memo(function PasswordReset() {
  const color = useColor();
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const {goBack, navigate} = useNavigation<
    StackNavigationProp<LandingStackParams>
  >();
  const focus = useIsFocused();
  const emailRef = useRef<OriginalTextInput | null>(null);

  const onSubmit = useCallback(() => {
    if (!state.complete) return;
    goBack();
  }, [goBack, state.complete]);
  const navWelcome = useCallback(() => navigate('welcome'), [navigate]);
  const onFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = {...form.current, [key]: val};
      const complete = val.length > 0;
      setState(p => ({...p, complete}));
    },
    [],
  );
  const navBack = useCallback(() => goBack(), [goBack]);

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
        autoCorrect={false}
        blurOnSubmit={false}
        keyboardType="email-address"
        onChangeText={onFormChange('email')}
        onRef={emailRef}
        onSubmitEditing={onSubmit}
        placeholder="Email address"
        returnKeyType="send"
        style={{marginBottom: config.padding(4)}}
        textContentType="username"
        value=""
      />
      <Button
        center
        color="primary"
        disable={!state.complete}
        emphasis="high"
        onPress={onSubmit}
        title="Reset password"
      />
    </Modal>
  );
});
