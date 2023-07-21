import React, { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Button,
  Card,
  Input,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';

export const Inputs = () => {
  const { goBack } = useNavigation();
  const colors = useColors();

  const [form, setForm] = useState({
    email: '',
    error: '',
    loading: false,
    name: '',
    password: '',
  });

  const handleChange = useCallback(
    (key: string) => (val: string) => {
      setForm((prev) => ({ ...prev, [key]: val }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setForm((prev) => ({ ...prev, error: 'Invalid Email' }));
  }, []);

  const handleOnSubmit = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Inputs"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          gap: spacing(4),
          padding: spacing(4),
        }}
        style={{
          backgroundColor: colors.background.secondary,
        }}
      >
        <Card>
          <Text
            center
            emphasis="low"
            title="border"
            type="h4"
          />
          <Input
            containerStyle={{ paddingBottom: spacing(2) }}
            error={form.error}
            onChangeText={handleChange('name')}
            optional
            placeholder="jane doe"
            title="Name"
            value={form.name}
          />
          <Input
            containerStyle={{ paddingBottom: spacing(2) }}
            error={form.error}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            placeholder="example@gmail.com"
            textContentType="username"
            title="Email"
            value={form.email}
          />
          <Input
            containerStyle={{ paddingBottom: spacing(2) }}
            onChangeText={handleChange('password')}
            placeholder="•••••••"
            secureTextEntry
            textContentType="password"
            title="Password"
            value={form.password}
          />
          <Button
            center
            color="accent"
            emphasis="high"
            onPress={handleSubmit}
            title="complete form"
          />
        </Card>
        <Card>
          <Text
            center
            emphasis="low"
            title="non border"
            type="h4"
          />
          <Spacing padding={spacing(2)} />
          <TextInput
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect
            blurOnSubmit
            editable={!form.loading}
            error={Boolean(form.error)}
            keyboardType="default"
            onChangeText={handleChange('name')}
            onSubmitEditing={handleOnSubmit}
            placeholder="jane doe"
            returnKeyType="next"
            textContentType="none"
            value={form.name}
          />
          <Spacing padding={spacing(2)} />
          <TextInput
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect={false}
            blurOnSubmit
            editable={!form.loading}
            error={Boolean(form.error)}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onSubmitEditing={handleOnSubmit}
            placeholder="example@gmail.com"
            returnKeyType="next"
            textContentType="username"
            value={form.email}
          />
          <Spacing padding={spacing(2)} />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            blurOnSubmit
            editable={!form.loading}
            keyboardType="default"
            onChangeText={handleChange('password')}
            onSubmitEditing={handleOnSubmit}
            placeholder="•••••••"
            returnKeyType="next"
            secureTextEntry
            textContentType="password"
            value={form.password}
          />
          <Spacing padding={spacing(2)} />
          <Button
            center
            color="accent"
            emphasis="high"
            onPress={handleSubmit}
            title="complete form"
          />
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
