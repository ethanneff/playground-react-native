import React, { memo, useState } from "react";
import { Button, Screen, Text, TextInput } from "../../../../components";
import { View, StyleSheet } from "react-native";
import { useNav } from "../../../../hooks";

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-around" }
});

export default memo(function PortfolioLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNav();
  const handlePassword = (val: string) => setPassword(val);
  const handleEmail = (val: string) => setEmail(val);

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")}>
      <Text title="Login" h1 center />
      <TextInput
        title="email"
        placeholder="example@gmail.com"
        onChangeText={handleEmail}
        value={email}
      />
      <TextInput
        title="password"
        placeholder="•••••••"
        onChangeText={handlePassword}
        value={password}
      />
      <View style={styles.row}>
        <Button title="Login" onPress={nav.to("portfolio")} />
        <Button title="Forgot" onPress={nav.to("portfolioForgotPassword")} />
      </View>
    </Screen>
  );
});
