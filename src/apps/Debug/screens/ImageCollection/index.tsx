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
  private infiniteScrollThreshold = 0.3;
  private columnWidth = Dimensions.get('window').width / this.numColumns;
  private imageUrl = `http://lorempixel.com/${this.columnWidth}/${this.columnWidth}`;
  public render() {
    return (
      <Screen onLeftPress={this.nav('debug')} title="Image Collection">
        <FlatList
          keyExtractor={(data) => data.toString()}
          data={this.data}
          onEndReached={this.fetchMore}
          onEndReachedThreshold={this.infiniteScrollThreshold}
          numColumns={this.numColumns}
          renderItem={this.renderImage}
        />
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

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

const mapDispatchToProps: DispatchProps = {navigate};

export default connect(null, mapDispatchToProps)(Container);
