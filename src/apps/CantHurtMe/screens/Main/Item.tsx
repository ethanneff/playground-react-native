import React from "react";
import { Card, Text } from "../../../../components";
import { Theme } from "../../../../utils";
import { app } from "../../data";

export const Item = (props: { item: string; index: number }) => {
  const { item, index } = props;
  const data = app.goals.byId[item];
  return (
    <Card key={data.id} flex onPress={() => undefined}>
      <Text
        title={`Challenge #${index + 1}`}
        center
        h4
        bold
        style={{ paddingBottom: Theme.padding.p04 }}
      />
      <Text title={data.challenge} center />
    </Card>
  );
};
