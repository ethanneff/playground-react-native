import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen} from '../../../../components';
import {useNav} from '../../../../hooks';
import Walkthrough from './Walkthrough';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default memo(function PortfolioLanding() {
  const nav = useNav();
  return (
    <Screen title="Landing">
      <Walkthrough />
      <View style={styles.row}>
        <Button onPress={nav.to('portfolioLogin')} title="Login" />
        <Button onPress={nav.to('portfolio')} title="Main" />
        <Button onPress={nav.to('portfolioSettings')} title="Settings" />
      </View>
      <View style={styles.row}>
        <Button onPress={nav.to('checklists')} title="Checklist" />
        <Button onPress={nav.to('cantHurtMe')} title="Cant Hurt" />
        <Button onPress={nav.to('theOneThing')} title="One Thing " />
      </View>
      <View style={styles.row}>
        <Button onPress={nav.to('journal')} title="Journal" />
        <Button onPress={nav.to('activity')} title="Activity" />
        <Button onPress={nav.to('focus')} title="Focus" />
      </View>
      <View style={styles.row}>
        <Button onPress={nav.to('gamesFlappyBird')} title="FlappyBird" />
        <Button onPress={nav.to('gamesSnake')} title="Snake" />
        <Button onPress={nav.to('gamesPapiJump')} title="PapiJump" />
        <Button onPress={nav.to('gamesArchero')} title="Archero" />
      </View>
      <View style={styles.row}>
        <Button onPress={nav.to('playground')} title="Playground" />
      </View>
    </Screen>
  );
});
