import * as React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { Button, Screen, Text } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";
import { connect } from "react-redux";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private readonly data = [
    {
      choices: [
        {
          key: "1",
          selected: false,
          title: "individual"
        },
        {
          key: "2",
          selected: false,
          title: "couple"
        },
        {
          key: "3",
          selected: false,
          title: "teen"
        }
      ],
      key: "1",
      next: "2",
      title: "What type of counseling are you looking for",
      type: "radio"
    },
    { key: "2", title: "2" },
    { key: "3", title: "3" },
    { key: "4", title: "4" },
    { key: "5", title: "5" }
  ];
  private output: any = {};
  private readonly width = Dimensions.get("window").width;
  private tableView: any;
  private currentIndex = 0;

  public onViewableItemsChanged = ({ viewableItems }: any) => {
    this.currentIndex = viewableItems[0].index || 0;
  };

  public onProgress = (direction = 1) => {
    const index = this.currentIndex + direction;
    if (index < 0) {
      return;
    }
    if (index >= this.data.length) {
      this.onFinish();
      return;
    }
    this.tableView.scrollToIndex({
      animated: true,
      index
    });
  };

  public onSelection = (item: any, choice: any) => {
    this.output = {
      ...this.output,
      [item.key]: {
        ...this.output[item.key],
        [choice.key]: true
      }
    };

    // this.onProgress();
  };
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

  public onFinish = () => undefined;

  public render() {
    return (
      <Screen disableScroll onLeftPress={this.nav(NavigationScreen.Debug)}>
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

const mapDispatchToProps: DispatchProps = { navigate };

export const Questionnaire = connect(
  null,
  mapDispatchToProps
)(Container);
