import React from 'react';
import { StyleSheet, type TextStyle } from 'react-native';
import { v4 } from 'uuid';
import { View } from '../../components';
import { Text } from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

type Props = {
  readonly style?: TextStyle;
  readonly title: string;
};

export class Markdown extends React.PureComponent<Props> {
  boldSyntax = '*';

  withoutSyntaxIndex = 2;

  isWordBold(word: string): boolean {
    return (
      word.length > this.withoutSyntaxIndex &&
      word.startsWith(this.boldSyntax) &&
      word.endsWith(this.boldSyntax)
    );
  }

  formattedWord(words: string[], word: string, index: number): string {
    const space = words.length - 1 === index ? '' : ' ';
    const trimmed = this.isWordBold(word)
      ? word.substring(1, word.length - 1)
      : word;
    return trimmed + space;
  }

  render() {
    const { style, title } = this.props;
    const words = title.split(' ');
    return (
      <View style={styles.container}>
        {words.map((word: string, index: number) => (
          <Text
            bold={this.isWordBold(word)}
            key={v4()}
            style={style}
            title={this.formattedWord(words, word, index)}
          />
        ))}
      </View>
    );
  }
}
