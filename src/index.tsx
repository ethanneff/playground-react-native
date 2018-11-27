import * as React from "react";
import {
  AppRegistry,
  Button,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import { Config } from "./utils";

export class Launcher extends React.PureComponent {
  public data = [
    {
      key: "1",
      title: "What type of counseling are you looking for",
      next: "2",
      items: [
        {
          title: "individual"
        },
        {
          title: "couple"
        },
        {
          title: "teen"
        }
      ]
    },
    { key: "2", title: "2" },
    { key: "3", title: "3" },
    { key: "4", title: "4" },
    { key: "5", title: "5" }
  ];
  public width = Dimensions.get("window").width;
  public tableView: any;

  public currentIndex = 0;
  public onViewableItemsChanged = ({ viewableItems }: any) => {
    this.currentIndex = viewableItems[0].index || 0;
  };

  public onNext = () => {
    const index = this.currentIndex + 1;
    if (index >= this.data.length) {
      this.onFinish();
      return;
    }
    this.tableView.scrollToIndex({
      animated: true,
      index
    });
  };

  public onFinish = () => undefined;

  public render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>hello hello</Text>
          <FlatList
            scrollEnabled={false}
            ref={(ref: any) => (this.tableView = ref)}
            removeClippedSubviews
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50
            }}
            horizontal
            pagingEnabled
            data={this.data}
            renderItem={({ item }) => {
              let items: any = (
                <View
                  style={{ flex: 1, height: 20, backgroundColor: "pink" }}
                />
              );

              if (item.items) {
                items = item.items.map(i => {
                  return (
                    <Button
                      key={i.title}
                      title={i.title}
                      onPress={() => undefined}
                    />
                  );
                });
              }

              return (
                <View style={{ width: this.width }}>
                  <Text>{item.title}</Text>
                  {items}
                  <Button title="next" onPress={this.onNext} />
                </View>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

AppRegistry.registerComponent(Config.app.name, () => Launcher);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById(Config.web.root)
  });
}
