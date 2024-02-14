import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Text,
  TextInput,
  type TextInputReference,
} from '../../../../components';
import {
  type StackNavigationProperty,
  useIsFocused,
  useNavigation,
} from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { ModalHeader } from '../../components';
import { type LandingStackRoutes } from '../../navigationTypes';

const initialReference = { email: '' };
const initialState = { complete: false, loading: false };
export const PasswordReset = () => {
  const colors = useColors();
  const form = useRef(initialReference);
  const [state, setState] = useState(initialState);
  const { goBack, navigate } =
    useNavigation<StackNavigationProperty<LandingStackRoutes>>();
  const focus = useIsFocused();
  const emailReference = useRef<TextInputReference>(null);

  const onSubmit = useCallback(() => {
    if (!state.complete) return;
    setState((p) => ({ ...p, loading: true }));
    goBack();
  }, [goBack, state.complete]);

  const navWelcome = useCallback(() => {
    navigate('welcome');
  }, [navigate]);

  const onFormChange = useCallback(
    (key: keyof typeof initialReference) => (value: string) => {
      form.current = { ...form.current, [key]: value };
      const complete = value.length > 0;
      setState((p) => ({ ...p, complete }));
    },
    [],
  );

  useEffect(() => {
    if (focus) {
      emailReference.current?.focus();
    } else {
      form.current = initialReference;
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
        editable={!state.loading}
        keyboardType="email-address"
        onChangeText={onFormChange('email')}
        onRef={emailReference}
        onSubmitEditing={onSubmit}
        placeholder="Email address"
        returnKeyType="send"
        style={{ marginBottom: spacing(4) }}
        textContentType="username"
        value=""
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
};
