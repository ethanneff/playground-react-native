import moment from "moment";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "..";

interface Props {
  date: number;
}

interface State {
  showRelativeDate: boolean;
}

export class RelativeDate extends React.PureComponent<Props, State> {
  public state = { showRelativeDate: true };
  private minute = 60 * 1000;
  private timer?: number;

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
        <Text hidden={!showRelativeDate} title={moment(date).fromNow()} />
        <Text
          hidden={showRelativeDate}
          title={moment(date).format("MMM D YYYY, h:mm a")}
        />
      </TouchableOpacity>
    );
  }

  private toggleRelativeDate = () => {
    this.setState({ showRelativeDate: !this.state.showRelativeDate });
  };
}
