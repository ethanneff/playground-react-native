import React, { memo } from "react";
import { Button, Screen } from "../../../../components";
import { useNav } from "../../../../hooks";

export default memo(function PortfolioMain() {
  const nav = useNav();
  return (
    <Screen>
      <Text h1 center title="Main" />
      <Button title="logout" onPress={nav.to("portfolioLanding")} />
    </Screen>
  );
});
