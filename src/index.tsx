import * as React from "react";
import {
  AppRegistry,
  Button,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Card } from "./components";
import { Config } from "./utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "rgba(0,0,0,0.2)"
  },
  innerContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: Dimensions.get("window").width - 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#fafafa"
  }
});

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

  public state = {
    modalVisible: false
  };
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

  public setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Modal
            visible={this.state.modalVisible}
            animationType={"fade"}
            transparent
            onRequestClose={() => this.setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text>This is content inside of modal component</Text>
                <Button
                  onPress={() => this.setModalVisible(false)}
                  title="Close modal"
                />
              </View>
            </View>
          </Modal>

          <Text>hello hello</Text>
          <FlatList
            scrollEnabled={false}
            ref={(ref: any) => (this.tableView = ref)}
            removeClippedSubviews
            onViewableItemsChanged={this.onViewableItemsChanged}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 50
            // }}
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
          <Card
            title="mission"
            description=" We strive to offer our customers the lowest possible prices the
                best available selection and the utmost convenience."
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          />
          <Card
            title="Vision"
            description="To be Earth’s most customer-centric company where customers can find and discover anything they might want to buy online."
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
