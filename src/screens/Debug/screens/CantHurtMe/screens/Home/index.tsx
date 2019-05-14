import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../../../../../components";
import Dialog from "../../../../../../components/Dialog";
import {
  getHeight,
  getLandscapeOrientation,
  getWidth,
  RootState
} from "../../../../../../models";
import { Theme } from "../../../../../../utils";
import { DailyProgress, Header, ProfileLevel } from "../../components";
import { Card } from "../../components/Card";
import { app } from "../../data";

interface StateProps {
  landscape: boolean;
  width: number;
  height: number;
}

type Props = StateProps & RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public state = {
    settings: false
  };
  public renderItem = (props: { item: string; index: number }) => {
    const { item, index } = props;
    const data = app.goals.byId[item];
    return (
      <Card flex key={data.id} onPress={() => undefined}>
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

  public render() {
    const column = this.getColumns();
    return (
      <Screen
        onLeftPress={this.navBack}
        title="Can't Hurt Me"
        style={{
          backgroundColor: Theme.color.light,
          padding: Theme.padding.p02
        }}
      >
        <Header title="Progress" />
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ProfileLevel onPress={this.navTo("profile")} />
            <Button
              icon="settings"
              onPress={() => this.setState({ settings: true })}
              neutral
              fab
              center
            />
          </View>
          <DailyProgress />
        </Card>
        <Header title="Challenges" />
        <FlatList
          keyExtractor={this.keyExtractor}
          key={column}
          data={app.goals.orderById}
          renderItem={this.renderItem}
          numColumns={column}
          ListFooterComponent={this.renderFooter}
        />
        <Dialog
          title="hello"
          visible={this.state.settings}
          backgroundClose
          onCancelButtonPress={() => this.setState({ settings: false })}
        />
      </Screen>
    );
  }

  private getColumns = () => (this.props.landscape ? 4 : 2);

  private keyExtractor = (id: string) => app.goals.byId[id].id;

  private renderFooter = () => (
    <View style={{ paddingBottom: Theme.padding.p04 }} />
  );

  private navBack = () => this.props.history.goBack();

  private navTo = (to: string) => () =>
    this.props.history.push(`${this.props.match.path}/${to}`);
}

const mapStateToProps = (state: RootState): StateProps => ({
  height: getHeight(state),
  landscape: getLandscapeOrientation(state),
  width: getWidth(state)
});

export const Home = connect(mapStateToProps)(Component);
