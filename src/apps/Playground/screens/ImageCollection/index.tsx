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
  data: number[] = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ];
  numColumns = 3;
  handleInfiniteScrollThreshold = 0.3;
  columnWidth = Dimensions.get('window').width / this.numColumns;
  imageUrl = `http://lorempixel.com/${this.columnWidth}/${this.columnWidth}`;

  keyExtractor = (data: number) => data.toString();

  nav = (to: NavigationScreen) => () => {
    const {navigate: nav} = this.props;
    nav(to);
  };

  handleFetchMore = () => {
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
    this.data.push(Math.random());
  };

  renderImage = () => (
    <AsyncImage
      height={this.columnWidth}
      uri={this.imageUrl}
      width={this.columnWidth}
    />
  );

  render() {
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
}

const mapDispatchToProps: DispatchProps = {navigate};

export default connect(null, mapDispatchToProps)(Container);
