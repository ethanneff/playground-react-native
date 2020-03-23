import React, { memo, useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Screen } from '../../../../components';
import { useNav } from '../../../../hooks';
import Timer from './Timer';
import RoundButton from './ButtonRound';
import LapsTable from './LapsTable';
import ButtonsRow from './ButtonsRow';

interface State {
  laps: number[];
  now: number;
  start: number;
}

export default memo(function DebugStopWatch() {
  const nav = useNav();
  const [state, setState] = useState<State>({
    laps: [],
    now: 0,
    start: 0,
  });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const elapsed = state.now - state.start;
  const interval =
    state.laps.reduce((total, curr) => total + curr, 0) + elapsed;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#0D0D0D',
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 130,
    },
    timer: {
      color: '#FFFFFF',
      fontFamily: 'Courier',
      fontSize: 54,
      fontWeight: '200',
    },
  });

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [timer]);

  const lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = state;
    const [firstLap, ...other] = laps;
    setState({
      laps: [0, firstLap + now - start, ...other],
      now: timestamp,
      start: timestamp,
    });
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const { laps, now, start } = state;
    const [firstLap, ...other] = laps;
    setState({ laps: [firstLap + now - start, ...other], now: 0, start: 0 });
  };

  const reset = () => {
    setState({ laps: [], now: 0, start: 0 });
  };

  const run = () => {
    timer.current = setInterval(() => {
      setState((prev) => ({ ...prev, now: new Date().getTime() }));
    }, 100);
  };

  const start = () => {
    const now = new Date().getTime();
    setState({ laps: [0], now, start: now });
    run();
  };

  const resume = () => {
    const now = new Date().getTime();
    setState((prev) => ({
      ...prev,
      now,
      start: now,
    }));
    run();
  };

  return (
    <Screen onLeftPress={nav.to('debug')} style={styles.container}>
      <Timer interval={interval} style={styles.timer} />
      {state.laps.length === 0 && (
        <ButtonsRow>
          <RoundButton
            title="Lap"
            color="#8B8B90"
            background="#151515"
            onPress={lap}
            disabled
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={start}
          />
        </ButtonsRow>
      )}
      {state.start > 0 && (
        <ButtonsRow>
          <RoundButton
            title="Lap"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={lap}
          />
          <RoundButton
            title="Stop"
            color="#E33935"
            background="#3C1715"
            onPress={stop}
          />
        </ButtonsRow>
      )}
      {state.laps.length > 0 && state.start === 0 && (
        <ButtonsRow>
          <RoundButton
            title="Reset"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={reset}
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={resume}
          />
        </ButtonsRow>
      )}
      <LapsTable laps={state.laps} timer={elapsed} />
    </Screen>
  );
});
