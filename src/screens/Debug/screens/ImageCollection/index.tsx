import * as React from "react";
import { Dimensions, FlatList } from "react-native";
import { RouteComponentProps } from "react-router";
import { Screen } from "../../../../components";
import { AsyncImage } from "./AsyncImage";

type Props = RouteComponentProps;

export class ImageCollection extends React.PureComponent<Props> {
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

  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
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
