import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Screen, Text} from '../../../../components';
import {NavigationScreen, navigate} from '../../../../models';
import {Questionnaires} from './screens/Questionnaires';

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  readonly data = [
    {
      choices: [
        {
          key: '1',
          selected: false,
          title: 'individual',
        },
        {
          key: '2',
          selected: false,
          title: 'couple',
        },
        {
          key: '3',
          selected: false,
          title: 'teen',
        },
      ],
      key: '1',
      next: '2',
      title: 'What type of counseling are you looking for',
      type: 'radio',
    },
    {key: '2', title: '2'},
    {key: '3', title: '3'},
    {key: '4', title: '4'},
    {key: '5', title: '5'},
  ];
  output: any = {};
  readonly width = Dimensions.get('window').width;
  tableView: any;
  currentIndex = 0;

  handleViewableItemsChanged = ({viewableItems}: any) => {
    this.currentIndex = viewableItems[0].index || 0;
  };

  onProgress = (direction = 1) => {
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
      index,
    });
  };

  onSelection = (item: any, choice: any) => {
    this.output = {
      ...this.output,
      [item.key]: {
        ...this.output[item.key],
        [choice.key]: true,
      },
    };

    // this.onProgress();
  };

  onFinish = () => undefined;

  setRef = (ref: any) => {
    this.tableView = ref;
  };

  updateSelection = (item: any, choice: any) => () =>
    this.onSelection(item, choice);

  updateProgress = (value: number) => () => this.onProgress(value);

  renderItem = ({item}: {item: any}) => {
    let items: any = <View style={{flex: 1}} />;

    if (item.choices) {
      items = (
        <View style={{flex: 1}}>
          {item.choices.map((choice: any) => {
            return (
              <Button
                key={choice.title}
                onPress={this.updateSelection(item, choice)}
                title={choice.title}
              />
            );
          })}
        </View>
      );
    }

    return (
      <View style={{width: this.width}}>
        <Text title={item.title} />
        {items}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button onPress={this.updateProgress(-1)} title="prev" />
          <Button onPress={this.updateProgress(1)} title="next" />
          <Button onPress={this.updateProgress(2)} title="next2" />
        </View>
      </View>
    );
  };

  nav = (to: NavigationScreen) => () => {
    const {navigate: nav} = this.props;
    nav(to);
  };

  render() {
    return (
      <Screen onLeftPress={this.nav('playground')} title="Questionnaire">
        <FlatList
          data={this.data}
          horizontal
          onViewableItemsChanged={this.handleViewableItemsChanged}
          pagingEnabled
          ref={this.setRef}
          removeClippedSubviews
          renderItem={this.renderItem}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
        />
        <Questionnaires />
      </Screen>
    );
  }
}

const mapDispatchToProps: DispatchProps = {navigate};

export default connect(null, mapDispatchToProps)(Container);
