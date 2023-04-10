import React, { memo, useCallback, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Button,
  Card,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Text,
  TextInput,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';

export const Inputs = memo(function Inputs() {
  const { goBack } = useNavigation();
  const colors = useColors();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('render');

  const form = useRef({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = useCallback(
    (key: string) => (val: string) => {
      form.current = { ...form.current, [key]: val };
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setError('hello');
    }, 1000);
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
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: colors.background.secondary,
        }}
      >
        {/* <Card>
          <Text
            center
            emphasis="low"
            title="border"
            type="h4"
          />
          <Input
            containerStyle={{ paddingBottom: spacing(2) }}
            error={error}
            onChangeText={handleChange('name')}
            optional
            placeholder="jane doe"
            title="Name"
            value={form.current.name}
          />
          <Input
            containerStyle={{ paddingBottom: spacing(2) }}
            error={error}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            placeholder="example@gmail.com"
            textContentType="username"
            title="Email"
            value={form.current.email}
          />
          <Input
            containerStyle={{ paddingBottom: spacing(2) }}
            onChangeText={handleChange('password')}
            placeholder="•••••••"
            secureTextEntry
            textContentType="password"
            title="Password"
            value={form.current.password}
          />
          <Button
            center
            color="accent"
            emphasis="high"
            onPress={handleSubmit}
            title="complete form"
          />
        </Card> */}
        <Spacing padding={spacing(22)} />
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
            defaultValue={form.current.name}
            editable={!loading}
            error={error}
            iconSend
            keyboardType="default"
            onChangeText={handleChange('name')}
            onSubmitEditing={handleOnSubmit}
            placeholder="jane doe"
            returnKeyType="next"
            textContentType="none"
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect={false}
            blurOnSubmit
            defaultValue={form.current.email}
            editable={!loading}
            error={error}
            iconSend
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onSubmitEditing={handleOnSubmit}
            placeholder="example@gmail.com"
            returnKeyType="next"
            textContentType="username"
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            blurOnSubmit
            defaultValue={form.current.password}
            editable={!loading}
            error={error}
            iconClear
            iconEye
            keyboardType="default"
            onChangeText={handleChange('password')}
            onSubmitEditing={handleOnSubmit}
            placeholder="password"
            returnKeyType="next"
            secureTextEntry
            textContentType="password"
          />
          <Spacing padding={spacing(2)} />
          <Button
            center
            color="accent"
            emphasis="high"
            loading={loading}
            onPress={handleSubmit}
            title="complete form"
          />
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
});
