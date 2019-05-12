import * as React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Screen, Text } from "../../../../components";
import {
  getHeight,
  getLandscapeOrientation,
  getWidth,
  RootState
} from "../../../../models";
import { Theme } from "../../../../utils";
import { app } from "./data";

interface StateProps {
  landscape: boolean;
  width: number;
  height: number;
}

type Props = StateProps & RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public renderItem = (props: { item: string; index: number }) => {
    const { item, index } = props;
    const data = app.goals.byId[item];
    return (
      <TouchableOpacity
        key={data.id}
        style={{
          backgroundColor: Theme.color.background,
          elevation: 1,
          flex: 1,
          margin: Theme.padding.p02,
          padding: Theme.padding.p04,
          shadowColor: Theme.color.dark,
          shadowOffset: { height: Theme.padding.p01, width: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2
        }}
      >
        <Text
          title={`Challenge #${index + 1}`}
          center
          h4
          bold
          style={{ paddingBottom: Theme.padding.p04 }}
        />
        <Text title={data.challenge} center />
      </TouchableOpacity>
    );
  };

  public getColumns = () => (this.props.landscape ? 4 : 2);

  public keyExtractor = (id: string) => app.goals.byId[id].id;

  public renderFooter = () => (
    <View style={{ paddingBottom: Theme.padding.p04 }} />
  );

  public render() {
    const { history } = this.props;
    const column = this.getColumns();
    return (
      <Screen
        onLeftPress={() => history.goBack()}
        title="Can't Hurt Me"
        style={{ backgroundColor: Theme.color.light }}
      >
        <FlatList
          style={{
            backgroundColor: Theme.color.light,
            padding: Theme.padding.p02,
            paddingBottom: Theme.padding.p20
          }}
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
}

const mapStateToProps = (state: RootState): StateProps => ({
  height: getHeight(state),
  landscape: getLandscapeOrientation(state),
  width: getWidth(state)
});

export const CantHurtMe = connect(mapStateToProps)(Component);
