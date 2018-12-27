import * as React from "react";
import { ScrollView } from "react-native";
import { RouteComponentProps } from "react-router";
import { Button, Screen } from "../../../../components";

type Props = RouteComponentProps;

export class Buttons extends React.PureComponent<Props> {
  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <ScrollView>
          <Button title="nothing" onPress={() => undefined} />
          <Button neutral title="neutral" onPress={() => undefined} />
          <Button text title="text" onPress={() => undefined} />
          <Button outlined title="outlined" onPress={() => undefined} />
          <Button contained title="contained" onPress={() => undefined} />

          <Button wrap title="nothing" onPress={() => undefined} />
          <Button wrap neutral title="neutral" onPress={() => undefined} />
          <Button wrap text title="text" onPress={() => undefined} />
          <Button wrap outlined title="outlined" onPress={() => undefined} />
          <Button wrap contained title="contained" onPress={() => undefined} />

          <Button half title="nothing" onPress={() => undefined} />
          <Button half neutral title="neutral" onPress={() => undefined} />
          <Button half text title="text" onPress={() => undefined} />
          <Button half outlined title="outlined" onPress={() => undefined} />
          <Button half contained title="contained" onPress={() => undefined} />

          <Button half center title="nothing" onPress={() => undefined} />
          <Button
            half
            center
            neutral
            title="neutral"
            onPress={() => undefined}
          />
          <Button half center text title="text" onPress={() => undefined} />
          <Button
            half
            center
            outlined
            title="outlined"
            onPress={() => undefined}
          />
          <Button
            half
            center
            contained
            title="contained"
            onPress={() => undefined}
          />

          <Button disable wrap title="nothing" onPress={() => undefined} />
          <Button
            disable
            wrap
            neutral
            title="neutral"
            onPress={() => undefined}
          />
          <Button disable wrap text title="text" onPress={() => undefined} />
          <Button
            disable
            wrap
            outlined
            title="outlined"
            onPress={() => undefined}
          />
          <Button
            disable
            wrap
            contained
            title="contained"
            onPress={() => undefined}
          />

          <Button half icon="check" title="nothing" onPress={() => undefined} />
          <Button
            half
            icon="check"
            neutral
            title="neutral"
            onPress={() => undefined}
          />
          <Button
            half
            icon="check"
            text
            title="text"
            onPress={() => undefined}
          />
          <Button
            half
            icon="check"
            outlined
            title="outlined"
            onPress={() => undefined}
          />
          <Button
            half
            icon="check"
            contained
            title="contained"
            onPress={() => undefined}
          />

          <Button wrap icon="check" onPress={() => undefined} />
          <Button wrap icon="check" neutral onPress={() => undefined} />
          <Button wrap icon="check" text onPress={() => undefined} />
          <Button wrap icon="check" outlined onPress={() => undefined} />
          <Button wrap icon="check" contained onPress={() => undefined} />

          <Button fab icon="check" onPress={() => undefined} />
          <Button fab icon="check" neutral onPress={() => undefined} />
          <Button fab icon="check" text onPress={() => undefined} />
          <Button fab icon="check" outlined onPress={() => undefined} />
          <Button fab icon="check" contained onPress={() => undefined} />
        </ScrollView>
      </Screen>
    );
  }
}
