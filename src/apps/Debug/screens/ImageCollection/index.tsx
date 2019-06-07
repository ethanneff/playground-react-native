import * as React from "react";
import { Dimensions, FlatList } from "react-native";
import { Screen } from "../../../../components";
import { AsyncImage } from "./AsyncImage";
import { NavigationScreen, navigate } from "../../../../models";
import { connect } from "react-redux";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private data: number[] = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random()
  ];
  private numColumns = 3;
  private infiniteScrollThreshold = 0.3;
  private columnWidth = Dimensions.get("window").width / this.numColumns;
  private imageUrl = `http://lorempixel.com/${this.columnWidth}/${
    this.columnWidth
  }`;

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.Debug)}>
        <FlatList
          keyExtractor={data => data.toString()}
          data={this.data}
          onEndReached={this.fetchMore}
          onEndReachedThreshold={this.infiniteScrollThreshold}
          numColumns={this.numColumns}
          renderItem={this.renderImage}
        />
      </Screen>
    );
  }

  private fetchMore = () => {
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
  };

  private renderImage = () => (
    <AsyncImage
      uri={this.imageUrl}
      width={this.columnWidth}
      height={this.columnWidth}
    />
  );
}

const mapDispatchToProps: DispatchProps = { navigate };

export const ImageCollection = connect(
  null,
  mapDispatchToProps
)(Container);
