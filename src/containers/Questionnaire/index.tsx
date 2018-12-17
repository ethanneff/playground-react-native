import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { Button, Text, Screen } from "../../components";

interface Props {
  title: string;
}

export class Questionnaire extends React.PureComponent<Props> {
  public data = [
    {
      key: "1",
      title: "What type of counseling are you looking for",
      next: "2",
      type: "radio",
      choices: [
        {
          key: "1",
          title: "individual",
          selected: false
        },
        {
          key: "2",
          title: "couple",
          selected: false
        },
        {
          key: "3",
          title: "teen",
          selected: false
        }
      ]
    },
    { key: "2", title: "2" },
    { key: "3", title: "3" },
    { key: "4", title: "4" },
    { key: "5", title: "5" }
  ];
  output = {};
  public width = Dimensions.get("window").width;
  public tableView: any;
  public currentIndex = 0;

  public onViewableItemsChanged = ({ viewableItems }: any) => {
    this.currentIndex = viewableItems[0].index || 0;
  };

  public onProgress = (direction = 1) => {
    const index = this.currentIndex + direction;
    if (index < 0) return;
    if (index >= this.data.length) {
      this.onFinish();
      return;
    }
    this.tableView.scrollToIndex({
      animated: true,
      index
    });
  };

  onSelection = (item, choice) => {
    this.output = {
      ...this.output,
      [item.key]: {
        ...this.output[item.key],
        [choice.key]: true
      }
    };

    // this.onProgress();
  };

  public onFinish = () => undefined;

  render() {
    return (
      <Screen>
        <FlatList
          scrollEnabled={false}
          ref={(ref: any) => (this.tableView = ref)}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          horizontal
          pagingEnabled
          data={this.data}
          renderItem={({ item }) => {
            let items: any = <View style={{ flex: 1 }} />;

            if (item.choices) {
              items = (
                <View style={{ flex: 1 }}>
                  {item.choices.map(choice => {
                    return (
                      <Button
                        key={choice.title}
                        title={choice.title}
                        onPress={() => {
                          this.onSelection(item, choice);
                        }}
                      />
                    );
                  })}
                </View>
              );
            }

            return (
              <View style={{ width: this.width }}>
                <Text title={item.title} />
                {items}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <Button title="prev" onPress={() => this.onProgress(-1)} />
                  <Button title="next" onPress={() => this.onProgress(1)} />
                  <Button title="next2" onPress={() => this.onProgress(2)} />
                </View>
              </View>
            );
          }}
        />
      </Screen>
    );
  }
}
