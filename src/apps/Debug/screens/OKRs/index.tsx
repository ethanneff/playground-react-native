import React, { memo } from "react";
import { ScrollView } from "react-native";
import { Card, Screen, Text } from "../../../../components";
import { useNav } from "../../../../hooks";
import { Theme } from "../../../../utils";

export default memo(function DebugOKRs() {
  const nav = useNav();
  return (
    <Screen disableScroll onLeftPress={nav.to("debug")}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: Theme.padding.p05 }}
      >
        <Card>
          <Text h6 title="Company" />
          <Card onPress={() => undefined}>
            <Text h6 title="Mission" />
            <Text
              title="We strive to offer our customers the lowest possible prices
        the best available selection and the utmost convenience."
            />
          </Card>
          <Card onPress={() => undefined}>
            <Text h6 title="Vision" />
            <Text title="To be Earth’s most customer-centric company where customers can find and discover anything they might want to buy online." />
          </Card>
          <Card onPress={() => undefined}>
            <Text h6 title="Values" />
            <Text title="Customer Obsession" />
            <Text title="Ownership" />
            <Text title="Invent and Simplify" />
            <Text title="Are Right a Lot" />
            <Text title="Learn and Be Curious" />
            <Text title="Hire and Develop the Best" />
            <Text title="Insist on the Highest Standards" />
            <Text title="Think Big" />
            <Text title="Bias for Action" />
            <Text title="Frugality" />
            <Text title="Earn Trust" />
            <Text title="Dive Deep" />
            <Text title="Have Backbone; Disagree and Commit" />
            <Text title="Deliver Results" />
          </Card>
        </Card>
        <Card>
          <Text h6 title="Product" />
          <Card onPress={() => undefined}>
            <Text h6 title="Vision" />
            <Text title="Jim, owner" />
          </Card>

          <Card onPress={() => undefined}>
            <Text h6 title="KPIs" />
            <Text title="Customer Lifetime Value" />
            <Text title="Average Revenue Per user" />
            <Text title="Customer Aquisition Cost" />
            <Text title="Monthly Recurring Revenue" />
            <Text title="Churn" />
            <Text title="Cost of Sales" />
            <Text title="Contributing Margins" />
          </Card>
          <Card onPress={() => undefined}>
            <Text h6 title="Team" />
            <Text title="Jim, owner" />
            <Text title="Bob, designer" />
            <Text title="Steve, engineer" />
            <Text title="Greg, engineer" />
          </Card>

          <Card onPress={() => undefined}>
            <Text h6 title="Objective" />
            <Text title="Jim, owner" />
            <Card onPress={() => undefined}>
              <Text h6 title="KeyResult" />
              <Text title="Jim, owner" />
            </Card>
            <Card onPress={() => undefined}>
              <Text h6 title="KeyResult" />
              <Text title="Jim, owner" />
            </Card>
            <Card onPress={() => undefined}>
              <Text h6 title="KeyResult" />
              <Text title="Jim, owner" />
            </Card>
          </Card>
          <Card onPress={() => undefined}>
            <Text h6 title="Objective" />
            <Text title="Jim, owner" />
          </Card>
        </Card>
      </ScrollView>
    </Screen>
  );
});
