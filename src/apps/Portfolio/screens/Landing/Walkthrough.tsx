import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Text } from "../../../../components";
import { RootState } from "../../../../containers";
import { getWidth } from "../../../../models";

interface StateProps {
  width: number;
}

type Props = StateProps;

class Component extends React.PureComponent<Props> {

  public data = [
    { key: 1, text: "hello", color: "lightgrey" },
    { key: 2, text: "bob", color: "lightblue" },
    { key: 3, text: "steve", color: "lightgreen" },
    { key: 4, text: "jill", color: "lightpink" }
  ];
  public render() {
    const { width } = this.props;
    return (
      <FlatList
        pagingEnabled
        horizontal
        keyExtractor={item => String(item.key)}
        data={this.data}
        renderItem={({ item }) => (
          <View style={this.styles(width, item.color).item}>
            <Text title={item.text} center />
          </View>
        )}
      />
    );
  }
  private styles = (width?: number, color?: string) =>
    StyleSheet.create({
      item: {
        backgroundColor: color,
        justifyContent: "center",
        width
      }
    });
}
const mapStateToProps = (state: RootState) => ({
  width: getWidth(state)
});
export const Walkthrough = connect(mapStateToProps)(Component);
