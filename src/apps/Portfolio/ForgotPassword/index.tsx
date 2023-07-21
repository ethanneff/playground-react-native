import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Input,
  Screen,
  ScrollView,
  Spacing,
  View,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { spacing, useColors } from '../../../features';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-around' },
});

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { goBack } = useNavigation();
  const handleEmail = useCallback((val: string) => {
    setEmail(val);
  }, []);
  const navLogin = useCallback(() => {
    goBack();
  }, [goBack]);
  const colors = useColors();
  return (
    <Screen
      dropShadow
      onLeftPress={navLogin}
      title="Forgot Password"
    >
      <ScrollView
        style={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
      >
        <Input
          hideError
          onChangeText={handleEmail}
          placeholder="example@gmail.com"
          title="email"
          value={email}
        />
        <Spacing padding={spacing(2)} />
        <View style={styles.row}>
          <Button
            onPress={navLogin}
            title="Send email"
          />
        </View>
      </ScrollView>
    </Screen>
  );
};
