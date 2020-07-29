import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {Text} from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

interface Props {
  title: string;
  style?: TextStyle;
}

export class Markdown extends React.PureComponent<Props> {
  boldSyntax = '*';
  withoutSyntaxIndex = 2;

  isWordBold(word: string): boolean {
    return (
      word.length > this.withoutSyntaxIndex &&
      word[0] === this.boldSyntax &&
      word[word.length - 1] === this.boldSyntax
    );
  }

  formattedWord(words: string[], word: string, index: number): string {
    const space = words.length - 1 === index ? '' : ' ';
    const trimmed = this.isWordBold(word)
      ? word.substring(1, word.length - 1)
      : word;
    return trimmed + space;
  }

  render(): JSX.Element {
    const {title, style} = this.props;
    const words = title.split(' ');
    return (
      <View style={styles.container}>
        {words.map((word: string, index: number) => (
          <Text
            bold={this.isWordBold(word)}
            key={index}
            style={style}
            title={this.formattedWord(words, word, index)}
          />
        ))}
      </View>
    );
  }
}
