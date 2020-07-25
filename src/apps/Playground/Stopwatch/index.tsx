import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor, useNav} from '../../../hooks';
import Timer from './Timer';
import RoundButton from './ButtonRound';
import LapsTable from './LapsTable';
import ButtonsRow from './ButtonsRow';

interface State {
  laps: number[];
  now: number;
  start: number;
}

export default memo(function PlaygroundStopWatch() {
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
  const color = useColor();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: color.text,
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 130,
    },
    timer: {
      color: color.background,
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
    const {laps, now, start} = state;
    const [firstLap, ...other] = laps;
    setState({
      laps: [0, firstLap + now - start, ...other],
      now: timestamp,
      start: timestamp,
    });
  };

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const {laps, now, start} = state;
    const [firstLap, ...other] = laps;
    setState({laps: [firstLap + now - start, ...other], now: 0, start: 0});
  }, [timer, state]);

  const reset = useCallback(() => {
    setState({laps: [], now: 0, start: 0});
  }, []);

  const run = useCallback(() => {
    timer.current = setInterval(() => {
      setState((prev) => ({...prev, now: new Date().getTime()}));
    }, 100);
  }, []);

  const start = useCallback(() => {
    const now = new Date().getTime();
    setState({laps: [0], now, start: now});
    run();
  }, [run]);

  const resume = useCallback(() => {
    const now = new Date().getTime();
    setState((prev) => ({
      ...prev,
      now,
      start: now,
    }));
    run();
  }, [run]);

  const navBack = useCallback(nav('playground'), [nav]);
  return (
    <Screen onLeftPress={navBack}>
      <View style={styles.container}>
        <Timer interval={interval} style={styles.timer} />
        {state.laps.length === 0 && (
          <ButtonsRow>
            <RoundButton
              background="#151515"
              color="#8B8B90"
              disabled
              onPress={lap}
              title="Lap"
            />
            <RoundButton
              background="#1B361F"
              color="#50D167"
              onPress={start}
              title="Start"
            />
          </ButtonsRow>
        )}
        {state.start > 0 && (
          <ButtonsRow>
            <RoundButton
              background="#3D3D3D"
              color="#FFFFFF"
              onPress={lap}
              title="Lap"
            />
            <RoundButton
              background="#3C1715"
              color="#E33935"
              onPress={stop}
              title="Stop"
            />
          </ButtonsRow>
        )}
        {state.laps.length > 0 && state.start === 0 && (
          <ButtonsRow>
            <RoundButton
              background="#3D3D3D"
              color="#FFFFFF"
              onPress={reset}
              title="Reset"
            />
            <RoundButton
              background="#1B361F"
              color="#50D167"
              onPress={resume}
              title="Start"
            />
          </ButtonsRow>
        )}
        <LapsTable laps={state.laps} timer={elapsed} />
      </View>
    </Screen>
  );
});
