import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen, Text } from "../../../../components";
import { RootState } from "../../../../containers";
import {
  getHeight,
  getLandscapeOrientation,
  getWidth,
  navigate,
  NavigationModal,
  NavigationScreen,
  showModal
} from "../../../../models";
import { Theme } from "../../../../utils";
import { DailyProgress, Header, ProfileLevel } from "../../components";
import { Card } from "../../components/Card";
import { app } from "../../data";

interface StateProps {
  landscape: boolean;
  width: number;
  height: number;
}

interface DispatchProps {
  navigate: typeof navigate;
  showModal: typeof showModal;
}

type Props = StateProps & DispatchProps;

class Component extends React.PureComponent<Props> {
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
        onLeftPress={this.nav(NavigationScreen.PortfolioLanding)}
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
            <ProfileLevel
              onPress={this.modal(NavigationModal.CantHurtMeProfile)}
            />
            <Button
              icon="settings"
              onPress={this.modal(NavigationModal.CantHurtMeSettings)}
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
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  private modal = (to: NavigationModal) => () => this.props.showModal(to);

  private getColumns = () => (this.props.landscape ? 4 : 2);

  private keyExtractor = (id: string) => app.goals.byId[id].id;

  private renderFooter = () => (
    <View style={{ paddingBottom: Theme.padding.p04 }} />
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  height: getHeight(state),
  landscape: getLandscapeOrientation(state),
  width: getWidth(state)
});
const mapDispatchToProps: DispatchProps = { navigate, showModal };

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
