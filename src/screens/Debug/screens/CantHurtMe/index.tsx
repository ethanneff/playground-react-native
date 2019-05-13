import moment from "moment";
import * as React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../../../components";
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
  public readonly styles = StyleSheet.create({
    card: {
      backgroundColor: Theme.color.background,
      elevation: 1,
      margin: Theme.padding.p02,
      padding: Theme.padding.p04,
      shadowColor: Theme.color.dark,
      shadowOffset: { height: Theme.padding.p01, width: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 2
    },
    header: {
      padding: Theme.padding.p04
    },
    flex: {
      flex: 1
    }
  });
  public readonly image = require("../../../../assets/line-chart.png");

  public renderItem = (props: { item: string; index: number }) => {
    const { item, index } = props;
    const data = app.goals.byId[item];
    return (
      <TouchableOpacity
        key={data.id}
        style={[this.styles.card, this.styles.flex]}
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
        style={{
          backgroundColor: Theme.color.light,
          padding: Theme.padding.p02
        }}
      >
        <Text title="Progress" h3 style={this.styles.header} center />
        <View style={this.styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={this.image}
                resizeMode="contain"
                style={{ height: 50, width: 50 }}
              />
              <Text title="email" />
            </View>
            <Button
              icon="settings"
              onPress={() => undefined}
              neutral
              fab
              center
            />
          </View>
          <FlatList
            horizontal
            keyExtractor={item => String(item.date)}
            inverted
            data={this.generateHistory()}
            renderItem={({ item }) => {
              return (
                <View>
                  <Button
                    icon={
                      item.date.isSame(moment(), "day")
                        ? "check"
                        : item.date > moment()
                        ? "cancel"
                        : "close"
                    }
                    onPress={() => undefined}
                    neutral
                  />
                  <View
                    style={{
                      borderTopColor: Theme.color.text,
                      borderTopWidth: 2,
                      margin: 4,
                      width: 60
                    }}
                  >
                    <Text title={item.date.format("MMM DD")} center />
                  </View>
                </View>
              );
            }}
          />
        </View>
        <Text title="Challenges" h3 center style={this.styles.header} />
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

  private generateHistory = () => {
    const data = [];
    for (let i = 2; i >= -20; i--) {
      data.push({
        date: moment().add(i, "day")
      });
    }
    return data;
  };
}

const mapStateToProps = (state: RootState): StateProps => ({
  height: getHeight(state),
  landscape: getLandscapeOrientation(state),
  width: getWidth(state)
});

export const CantHurtMe = connect(mapStateToProps)(Component);
