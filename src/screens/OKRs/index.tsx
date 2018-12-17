import React from "react";
import { Card, Screen, Text } from "../../components";

export class OKRs extends React.PureComponent {
  public render() {
    return (
      <Screen>
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
      </Screen>
    );
  }
}
