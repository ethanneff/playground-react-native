import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../../../../components';
import {NavigationScreen, navigate} from '../../../../models';
import {AsyncImage} from './AsyncImage';

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
    Math.random(),
  ];
  private numColumns = 3;
  private handleInfiniteScrollThreshold = 0.3;
  private columnWidth = Dimensions.get('window').width / this.numColumns;
  private imageUrl = `http://lorempixel.com/${this.columnWidth}/${this.columnWidth}`;
  private keyExtractor = (data: number) => data.toString();
  public render() {
    return (
      <Screen onLeftPress={this.nav('playground')} title="Image Collection">
        <FlatList
          data={this.data}
          keyExtractor={this.keyExtractor}
          numColumns={this.numColumns}
          onEndReached={this.handleFetchMore}
          onEndReachedThreshold={this.handleInfiniteScrollThreshold}
          renderItem={this.renderImage}
        />
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

  private handleFetchMore = () => {
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
  };

  private renderImage = () => (
    <AsyncImage
      height={this.columnWidth}
      uri={this.imageUrl}
      width={this.columnWidth}
    />
  );
}

const mapDispatchToProps: DispatchProps = {navigate};

export default connect(null, mapDispatchToProps)(Container);
