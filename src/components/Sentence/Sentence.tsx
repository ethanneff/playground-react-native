import React, { memo } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  Text as OriginalText,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Text } from '../Text';
import { type SentenceType } from './types';

type Props = {
  center?: boolean;
  sentences: SentenceType[];
  style: StyleProp<TextStyle>;
};

export const Sentence = memo(function Sentence({
  center,
  sentences,
  style,
}: Props) {
  return (
    <OriginalText style={style}>
      {sentences.map(({ bold, emphasis, onPress, title, type }) => (
        <Text
          bold={bold}
          center={center}
          color={onPress ? 'accent' : 'primaryA'}
          emphasis={emphasis}
          key={title}
          onPress={onPress}
          title={`${title} `}
          type={type}
        />
      ))}
    </OriginalText>
  );
});
