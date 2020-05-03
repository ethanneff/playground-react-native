import React, {memo} from 'react';
import {StyleProp, Text as OriginalText, TextStyle} from 'react-native';
import {FontType} from '../Text/utils';
import {Text} from '../Text';

export type Word = {
  title: string;
  bold?: boolean;
  type?: FontType;
  functionality?: 'link' | 'text';
  onPress?: () => void;
};

interface Props {
  words: Word[];
  style: StyleProp<TextStyle>;
}

export const Sentence = memo(function Sentence({words, style}: Props) {
  return (
    <OriginalText style={style}>
      {words.map((word) => (
        <Text
          type={word.type}
          key={word.title}
          title={word.title}
          bold={word.bold}
          onPress={word.onPress}
        />
      ))}
    </OriginalText>
  );
});
