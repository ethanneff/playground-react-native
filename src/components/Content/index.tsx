import React, {memo} from 'react';
import {Text as Original, ScrollView, StyleSheet, View} from 'react-native';
import {Theme} from '../../utils';
import {Text} from '../Text';
import {useColor} from '../../hooks';
import {FontType} from '../Text/utils';

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

interface Props {
  body: ContentBody;
}

// TODO: use Sentence component
export const Content = memo(({body}: Props) => {
  const color = useColor();
  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: Theme.padding.p04,
    },
    link: {
      color: color.primary,
    },
    paragraph: {
      paddingBottom: Theme.padding.p02,
    },
    section: {
      paddingBottom: Theme.padding.p04,
    },
    title: {
      paddingBottom: Theme.padding.p02,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {body.sections.map((section, sectionIndex) => (
        <View key={`s-${sectionIndex}`} style={styles.section}>
          {section.title && (
            <Text
              key={section.title}
              style={styles.title}
              title={section.title}
              type={section.titleType}
            />
          )}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <Original key={`p-${paragraphIndex}`} style={styles.paragraph}>
              {paragraph.sentences.map(({onPress, content, type}) =>
                type === 'link' ? (
                  <Text
                    key={content}
                    onPress={onPress}
                    style={styles.link}
                    title={`${content} `}
                  />
                ) : (
                  <Text key={content} title={`${content} `} />
                ),
              )}
            </Original>
          ))}
        </View>
      ))}
    </ScrollView>
  );
});
