import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Text,
  TextInput,
  type TextInputRef,
} from '../../../../components';
import {
  useIsFocused,
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { ModalHeader } from '../../components';
import { type LandingStackRoutes } from '../../navigationTypes';

const initialRef = { email: '' };
const initialState = { complete: false, loading: false };
export const PasswordReset = memo(function PasswordReset() {
  const colors = useColors();
  const form = useRef(initialRef);
  const [state, setState] = useState(initialState);
  const { goBack, navigate } =
    useNavigation<StackNavigationProp<LandingStackRoutes>>();
  const focus = useIsFocused();
  const emailRef = useRef<TextInputRef>(null);

  const onSubmit = useCallback(() => {
    if (!state.complete) return;
    setState((p) => ({ ...p, loading: true }));
    goBack();
  }, [goBack, state.complete]);

  const navWelcome = useCallback(() => {
    navigate('welcome');
  }, [navigate]);

  const onFormChange = useCallback(
    (key: keyof typeof initialRef) => (val: string) => {
      form.current = { ...form.current, [key]: val };
      const complete = val.length > 0;
      setState((p) => ({ ...p, complete }));
    },
    [],
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
        title="Password reset"
      />
      <Text
        center
        style={{ paddingBottom: spacing(4) }}
        title="Please enter the email address associated with your account."
      />
      <Text
        center
        style={{ paddingBottom: spacing(4) }}
        title="We'll send you an email with your login email as well as a password reset instructions."
      />
      <TextInput
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        blurOnSubmit={false}
        defaultValue=""
        editable={!state.loading}
        keyboardType="email-address"
        onChangeText={onFormChange('email')}
        onRef={emailRef}
        onSubmitEditing={onSubmit}
        placeholder="Email address"
        returnKeyType="send"
        style={{ marginBottom: spacing(4) }}
        textContentType="username"
      />
      <Button
        center
        color="accent"
        disabled={!state.complete}
        emphasis="high"
        onPress={onSubmit}
        title="Reset password"
      />
    </Modal>
  ) : null;
});
