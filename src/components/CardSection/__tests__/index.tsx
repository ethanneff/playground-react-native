import * as React from "react";
import { create } from "react-test-renderer";
import { Card, CardSection } from "../..";

it("renders correctly", () => {
  const dom = create(
    <Card>
      <CardSection>
        <></>
      </CardSection>
    </Card>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
