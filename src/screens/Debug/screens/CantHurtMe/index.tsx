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
      shadowOffset: {
        height: Theme.padding.p01,
        width: 0
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      zIndex: 1
    },
    flex: {
      flex: 1
    },
    header: {
      padding: Theme.padding.p04
    }
  });
  public readonly image = require("../../../../assets/placeholder.png");

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
            <View>
              <Image
                source={this.image}
                resizeMode="contain"
                style={{
                  borderRadius: Theme.padding.p02,
                  borderColor: Theme.color.secondary,
                  borderWidth: 1,
                  alignSelf: "center",
                  height: Theme.padding.p18,
                  justifyContent: "center",
                  width: Theme.padding.p18
                }}
              />
              <View>
                <View
                  style={{
                    borderColor: Theme.color.secondary,
                    borderRadius: Theme.padding.p20,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderWidth: 1,
                    marginTop: -Theme.padding.p01,
                    marginLeft: 30,
                    height: Theme.padding.p04,
                    width: Theme.padding.p16,
                    backgroundColor: Theme.color.background
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Theme.color.success,
                      borderRadius: Theme.padding.p20,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      height: "100%",
                      width: "5%"
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: Theme.color.background,
                    borderRadius: Theme.padding.p20,
                    borderWidth: 1,
                    borderColor: Theme.color.secondary,
                    bottom: -Theme.padding.p02,
                    elevation: 2,
                    height: Theme.padding.p08,
                    width: Theme.padding.p08,
                    justifyContent: "center",
                    position: "absolute",
                    zIndex: 2
                  }}
                >
                  <Text title="1" subtitle2 center />
                </View>
              </View>
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
                    iconColor={
                      item.date.isSame(moment(), "day")
                        ? Theme.color.success
                        : item.date > moment()
                        ? Theme.color.secondary
                        : Theme.color.danger
                    }
                    onPress={() => undefined}
                    neutral
                  />
                  <View
                    style={{
                      borderTopColor: Theme.color.text,
                      borderTopWidth: 2,
                      margin: Theme.padding.p01,
                      width: Theme.padding.p15
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
