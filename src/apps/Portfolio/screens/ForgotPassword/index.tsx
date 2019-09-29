import React, { memo, useState } from "react";
import { Button, Screen, Text, TextInput } from "../../../../components";
import { View, StyleSheet } from "react-native";
import { useNav } from "../../../../hooks";

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-around" }
});

export default memo(function PortfolioForgotPassword() {
  const [email, setEmail] = useState("");
  const nav = useNav();
  const handleEmail = (val: string) => setEmail(val);
  return (
    <Screen onLeftPress={nav.to("portfolioLogin")}>
      <Text h1 title="Forgot Password" center />
      <TextInput
        title="email"
        placeholder="example@gmail.com"
        onChangeText={handleEmail}
        value={email}
      />
      <View style={styles.row}>
        <Button title="Send email" onPress={nav.to("portfolioLogin")} />
      </View>
    </Screen>
  );
});
