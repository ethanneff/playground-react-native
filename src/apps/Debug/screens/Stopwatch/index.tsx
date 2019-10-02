import moment from "moment";
import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { Screen } from "../../../../components";
import { NavigationScreen, navigate } from "../../../../models";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    width: 80
  },
  buttonBorder: {
    alignItems: "center",
    borderRadius: 38,
    borderWidth: 1,
    height: 76,
    justifyContent: "center",
    width: 76
  },
  buttonTitle: {
    fontSize: 18
  },
  buttonsRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 80
  },
  container: {
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 130
  },
  fastest: {
    color: "#4BC05F"
  },
  lap: {
    borderColor: "#151515",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  lapText: {
    color: "#FFFFFF",
    fontFamily: "Courier",
    fontSize: 18
  },
  scrollView: {
    alignSelf: "stretch"
  },
  slowest: {
    color: "#CC3531"
  },
  timer: {
    color: "#FFFFFF",
    fontFamily: "Courier",
    fontSize: 54,
    fontWeight: "200"
  },
  timerContainer: {
    flexDirection: "row"
  }
});

interface TimerProps {
  interval: number;
  style: StyleProp<TextStyle>;
}

function Timer({ interval, style }: TimerProps) {
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}.</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  );
}

interface RoundButtonProps {
  title: string;
  color: string;
  background: string;
  disabled?: boolean;
  onPress(): void;
}

function RoundButton({
  title,
  color,
  background,
  onPress,
  disabled = false
}: RoundButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

interface LapProps {
  num: number;
  interval: number;
  fastest: boolean;
  slowest: boolean;
}

function Lap({ num, interval, fastest, slowest }: LapProps) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ];
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {num}</Text>
      <Timer style={lapStyle} interval={interval} />
    </View>
  );
}

interface LapTableProps {
  laps: number[];
  timer: number;
}

function LapsTable({ laps, timer }: LapTableProps) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) {
        min = lap;
      }
      if (lap > max) {
        max = lap;
      }
    });
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          num={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  );
}

interface ButtonRowProps {
  children: React.ReactElement | React.ReactElement[];
}

function ButtonsRow({ children }: ButtonRowProps) {
  return <View style={styles.buttonsRow}>{children}</View>;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  public state = {
    laps: [],
    now: 0,
    start: 0
  };
  public timer?: any;

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public start = () => {
    const now = new Date().getTime();
    this.setState({
      laps: [0],
      now,
      start: now
    });
    this.run();
  };

  public lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      now: timestamp,
      start: timestamp
    });
  };

  public stop = () => {
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      now: 0,
      start: 0
    });
  };

  public reset = () => {
    this.setState({
      laps: [],
      now: 0,
      start: 0
    });
  };

  public run = () => {
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };

  public resume = () => {
    const now = new Date().getTime();
    this.setState({
      now,
      start: now
    });
    this.run();
  };

  public render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <Screen onLeftPress={this.nav("debug")} style={styles.container}>
        <Timer
          interval={laps.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.timer}
        />
        {laps.length === 0 && (
          <ButtonsRow>
            <RoundButton
              title="Lap"
              color="#8B8B90"
              background="#151515"
              onPress={this.lap}
              disabled
            />
            <RoundButton
              title="Start"
              color="#50D167"
              background="#1B361F"
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title="Lap"
              color="#FFFFFF"
              background="#3D3D3D"
              onPress={this.lap}
            />
            <RoundButton
              title="Stop"
              color="#E33935"
              background="#3C1715"
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title="Reset"
              color="#FFFFFF"
              background="#3D3D3D"
              onPress={this.reset}
            />
            <RoundButton
              title="Start"
              color="#50D167"
              background="#1B361F"
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
        <LapsTable laps={laps} timer={timer} />
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export default connect(
  null,
  mapDispatchToProps
)(Container);
