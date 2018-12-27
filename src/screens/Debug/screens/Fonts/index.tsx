import * as React from "react";
import { ScrollView } from "react-native";
import { RouteComponentProps } from "react-router";
import { Screen, Text } from "../../../../components";

type Props = RouteComponentProps;

export class Fonts extends React.PureComponent<Props> {
  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <ScrollView>
          <Text h1 title="H1: The quick brown fox jumps over the lazy dog." />
          <Text h2 title="H2: The quick brown fox jumps over the lazy dog." />
          <Text h3 title="H3: The quick brown fox jumps over the lazy dog." />
          <Text h4 title="H4: The quick brown fox jumps over the lazy dog." />
          <Text h5 title="H5: The quick brown fox jumps over the lazy dog." />
          <Text h6 title="H6: The quick brown fox jumps over the lazy dog." />
          <Text
            subtitle1
            title="SUBTITLE1: The quick brown fox jumps over the lazy dog."
          />
          <Text
            subtitle2
            title="SUBTITLE2: The quick brown fox jumps over the lazy dog."
          />
          <Text
            body1
            title="BODY1: The quick brown fox jumps over the lazy dog."
          />
          <Text
            body2
            title="BODY2: The quick brown fox jumps over the lazy dog."
          />
          <Text
            overline
            title="OVERLINE: The quick brown fox jumps over the lazy dog."
          />
          <Text
            caption
            title="CAPTION: The quick brown fox jumps over the lazy dog."
          />
          <Text
            button
            title="BUTTON: The quick brown fox jumps over the lazy dog."
          />
          <Text title="NOTHING: The quick brown fox jumps over the lazy dog." />
        </ScrollView>
      </Screen>
    );
  }
}
