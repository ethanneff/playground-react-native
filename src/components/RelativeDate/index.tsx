import dayjs from 'dayjs';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
dayjs.extend(relativeTime);

interface Props {
  date: number;
}

interface State {
  showRelativeDate: boolean;
}

export class RelativeDate extends React.PureComponent<Props, State> {
  public state = { showRelativeDate: true };
  private minute = 60 * 1000;
  private timer?: any;

  public componentDidMount() {
    this.timer = setInterval(() => this.forceUpdate(), this.minute);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    const { date } = this.props;
    const { showRelativeDate } = this.state;
    return (
      <TouchableOpacity onPress={this.toggleRelativeDate}>
        {showRelativeDate ? (
          <Text title={dayjs(date).fromNow()} />
        ) : (
          <Text title={dayjs(date).format('MMM D YYYY, h:mm a')} />
        )}
      </TouchableOpacity>
    );
  }

  private toggleRelativeDate = () => {
    this.setState({ showRelativeDate: !this.state.showRelativeDate });
  };
}
