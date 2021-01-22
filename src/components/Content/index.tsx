import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {config} from '../../utils';
import {Sentence} from '../Sentence';
import {Text} from '../Text';
import {Sections} from './types';

export interface ContentBody {
  sections: Sections;
}
type Sections = Section[];
interface Section {
  title: string;
  titleType: FontType;
  paragraphs: Paragraphs;
}
type Paragraphs = Paragraph[];
interface Paragraph {
  sentences: Sentences;
}
type Sentences = Sentence[];
type Sentence = Phrase | Link;
interface Phrase {
  content: string;
  type: 'phrase';
  onPress?(): void;
}
interface Link {
  content: string;
  type: 'link';
  onPress(): void;
}
type Props = {sections: Sections; center?: boolean};

interface Props {
  body: ContentBody;
}

// TODO: use Sentence component
export const Content = memo(({body}: Props) => {
  const color = useColor();
export const Content = memo(function Content({sections, center}: Props) {
  const styles = StyleSheet.create({
    paragraph: {paddingBottom: config.padding(4)},
    section: {paddingBottom: config.padding(2)},
    title: {paddingBottom: config.padding(2)},
  });

  return (
    <View>
      {sections.map((section, sectionIndex) => (
        <View key={`s-${sectionIndex}`} style={styles.section}>
          {section.title && (
            <Text
              center={center}
              emphasis={section.titleEmphasis}
              key={section.title}
              style={styles.title}
              title={section.title}
              type={section.titleType}
            />
          )}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <Sentence
              center={center}
              key={`p-${paragraphIndex}`}
              sentences={paragraph}
              style={styles.paragraph}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
