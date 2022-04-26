import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import {
  Button,
  Card,
  Input,
  KeyboardAwareScrollView,
  Screen,
  Text,
  TextInput,
} from '../../../components';
import { padding, useColors } from '../../../features';

export const Inputs = memo(function Inputs() {
  const { goBack } = useNavigation();
  const colors = useColors();

  const [form, setForm] = useState({
    email: '',
    error: '',
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

  return (
    <Screen dropShadow onLeftPress={goBack} title="Inputs">
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: colors.background.secondary,
        }}
      >
        <Card>
          <Text center emphasis="low" title="border" type="h4" />
          <Input
            containerStyle={{ paddingBottom: padding(2) }}
            error={form.error}
            onChangeText={handleChange('name')}
            optional
            placeholder="jane doe"
            title="Name"
            value={form.name}
          />
          <Input
            containerStyle={{ paddingBottom: padding(2) }}
            error={form.error}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            placeholder="example@gmail.com"
            textContentType="username"
            title="Email"
            value={form.email}
          />
          <Input
            containerStyle={{ paddingBottom: padding(2) }}
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
          <Text center emphasis="low" title="non border" type="h4" />
          <TextInput
            onChangeText={handleChange('name')}
            placeholder="jane doe"
            style={{ paddingTop: padding(4) }}
            value={form.name}
          />
          <TextInput
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            placeholder="example@gmail.com"
            style={{ paddingTop: padding(4) }}
            textContentType="username"
            value={form.email}
          />
          <TextInput
            onChangeText={handleChange('password')}
            placeholder="•••••••"
            secureTextEntry
            style={{ paddingVertical: padding(4) }}
            textContentType="password"
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
      </KeyboardAwareScrollView>
    </Screen>
  );
});
