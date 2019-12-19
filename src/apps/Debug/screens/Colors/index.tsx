import React, { memo } from "react";
import { View, ScrollView } from "react-native";
import { Screen, Text, Button } from "../../../../components";
import { useNav } from "../../../../hooks";
import { ColorTheme, changeTheme } from "../../../../models";
import { useRootSelector, useRootDispatch, Theme } from "../../../../utils";

export default memo(function DebugColors() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const currentTheme = useRootSelector(state => state.theme.currentColor);
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));
  // text: high 87% medium 60% disabled 38%
  // icon: active 100% inactive 60% disabled 38%
  return (
    <Screen onLeftPress={nav.to("debug")} title="Colors" gutter>
      <Text
        h4
        title="Theme"
        center
        style={{ paddingBottom: Theme.padding.p08 }}
      />
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        {themes.map(item => 
          <Button
            key={item}
            title={item}
            onPress={themePress(item)}
            primary
            contained={currentTheme === item}
          />
        )}
      </View>
      <ScrollView>
        <Text
          h4
          title="Buttons"
          center
          style={{ padding: Theme.padding.p08 }}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button primary title="primary" contained />
            <Button secondary title="secondary" contained />
            <Button success title="success" contained />
            <Button danger title="danger" contained />
            <Button warning title="warning" contained />
            <Button info title="info" contained />
            <Button light title="light" contained />
            <Button dark title="dark" contained />
            <Button title="default" contained />
          </View>
          <View style={{ flex: 1 }}>
            <Button primary title="primary" />
            <Button secondary title="secondary" />
            <Button success title="success" />
            <Button danger title="danger" />
            <Button warning title="warning" />
            <Button info title="info" />
            <Button light title="light" />
            <Button dark title="dark" />
            <Button title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Button outlined primary title="primary" />
            <Button outlined secondary title="secondary" />
            <Button outlined success title="success" />
            <Button outlined danger title="danger" />
            <Button outlined warning title="warning" />
            <Button outlined info title="info" />
            <Button outlined light title="light" />
            <Button outlined dark title="dark" />
            <Button outlined title="default" />
          </View>
        </View>

        <Text h4 title="Fonts" center style={{ padding: Theme.padding.p08 }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text title="normal" center />
            <Text h1 title="h1" />
            <Text h2 title="h2" />
            <Text h3 title="h3" />
            <Text h4 title="h4" />
            <Text h5 title="h5" />
            <Text h6 title="h6" />
            <Text subtitle1 title="subtitle1" />
            <Text subtitle2 title="subtitle2" />
            <Text body1 title="body1" />
            <Text body2 title="body2" />
            <Text overline title="overline" />
            <Text caption title="caption" />
            <Text button title="button" />
            <Text title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Text title="high" center />
            <Text high h1 title="h1" />
            <Text high h2 title="h2" />
            <Text high h3 title="h3" />
            <Text high h4 title="h4" />
            <Text high h5 title="h5" />
            <Text high h6 title="h6" />
            <Text high subtitle1 title="subtitle1" />
            <Text high subtitle2 title="subtitle2" />
            <Text high body1 title="body1" />
            <Text high body2 title="body2" />
            <Text high overline title="overline" />
            <Text high caption title="caption" />
            <Text high button title="button" />
            <Text high title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Text title="medium" center />
            <Text medium h1 title="h1" />
            <Text medium h2 title="h2" />
            <Text medium h3 title="h3" />
            <Text medium h4 title="h4" />
            <Text medium h5 title="h5" />
            <Text medium h6 title="h6" />
            <Text medium subtitle1 title="subtitle1" />
            <Text medium subtitle2 title="subtitle2" />
            <Text medium body1 title="body1" />
            <Text medium body2 title="body2" />
            <Text medium overline title="overline" />
            <Text medium caption title="caption" />
            <Text medium button title="button" />
            <Text medium title="default" />
          </View>
          <View style={{ flex: 1 }}>
            <Text title="low" center />
            <Text low h1 title="h1" />
            <Text low h2 title="h2" />
            <Text low h3 title="h3" />
            <Text low h4 title="h4" />
            <Text low h5 title="h5" />
            <Text low h6 title="h6" />
            <Text low subtitle1 title="subtitle1" />
            <Text low subtitle2 title="subtitle2" />
            <Text low body1 title="body1" />
            <Text low body2 title="body2" />
            <Text low overline title="overline" />
            <Text low caption title="caption" />
            <Text low button title="button" />
            <Text low title="default" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
