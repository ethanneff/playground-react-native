import React from "react";
import { Card, Screen } from "../../components";

interface Props {}

export class OKRs extends React.PureComponent<Props> {
  render() {
    return (
      <Screen>
        <Card
          title="Mission"
          description="We strive to offer our customers the lowest possible prices the
                best available selection and the utmost convenience."
          onPress={() => undefined}
        />
        <Card
          title="Vision"
          description="To be Earth’s most customer-centric company where customers can find and discover anything they might want to buy online."
          onPress={() => undefined}
        />
      </Screen>
    );
  }
}
