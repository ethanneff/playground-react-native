import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Text } from "../../components";
import { selectWidth } from "../../models";
import { RootState } from "../../models";

const styles = (width?: number, color?: string) =>
  StyleSheet.create({
    item: {
      backgroundColor: color,
      justifyContent: "center",
      width
    }
  });

interface StateProps {
  width: number;
}

type Props = StateProps;

class Component extends React.PureComponent<Props> {
  public data = [
    { key: 1, text: "hello", color: "white" },
    { key: 2, text: "bob", color: "pink" },
    { key: 3, text: "steve", color: "green" }
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
          <View style={styles(width, item.color).item}>
            <Text title={item.text} center />
          </View>
        )}
      />
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  width: selectWidth(state)
});
export const Walkthrough = connect(mapStateToProps)(Component);
