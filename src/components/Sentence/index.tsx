import React, {memo} from 'react';
import {Text as OriginalText, StyleProp, TextStyle} from 'react-native';
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
      {words.map(({bold, title, onPress, type}) => (
        <Text
          bold={bold}
          key={title}
          onPress={onPress}
          title={title}
          type={type}
        />
      ))}
    </OriginalText>
  );
});
