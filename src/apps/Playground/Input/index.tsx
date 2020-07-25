import React, {memo, useCallback, useState} from 'react';
import {Button, Screen, TextInput} from '../../../components';
import {useNav} from '../../../hooks';

export default memo(function PlaygroundInput() {
  const nav = useNav();

  const [form, setForm] = useState({
    email: '',
    error: '',
    name: '',
    password: '',
  });

  const handleChange = useCallback(
    (key: string) => (val: string) => {
      setForm((prev) => ({...prev, [key]: val}));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setForm((prev) => ({...prev, error: 'Invalid Email'}));
  }, []);
  const navBack = useCallback(nav('playground'), [nav]);

  return (
    <Screen gutter onLeftPress={navBack} title="Template">
      <TextInput
        error={form.error}
        onChangeText={handleChange('name')}
        optional
        placeholder="jane doe"
        title="Name"
        value={form.name}
      />
      <TextInput
        error={form.error}
        keyboardType="email-address"
        onChangeText={handleChange('email')}
        placeholder="example@gmail.com"
        textContentType="username"
        title="Email"
        value={form.email}
      />
      <TextInput
        onChangeText={handleChange('password')}
        placeholder="•••••••"
        secureTextEntry
        textContentType="password"
        title="Password"
        value={form.password}
      />
      <Button onPress={handleSubmit} title="complete form" />
    </Screen>
  );
});
