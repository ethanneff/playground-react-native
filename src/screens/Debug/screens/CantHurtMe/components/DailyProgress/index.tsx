import moment from "moment";
import React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Text } from "../../../../../../components";
import { Theme } from "../../../../../../utils";

class Component extends React.PureComponent {

  public render() {
    return (
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

export const DailyProgress = connect()(Component);
