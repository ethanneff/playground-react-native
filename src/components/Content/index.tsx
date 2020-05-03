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
  type: ParagraphType.Phrase;
}
interface Link {
  content: string;
  type: ParagraphType.Link;
  onPress(): void;
}

export enum ParagraphType {
  Phrase,
  Link,
}

interface Props {
  body: ContentBody;
}

// TODO: use Sentence component
export const Content: React.FC<Props> = memo(({body}) => {
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
        <View style={styles.section} key={`s-${sectionIndex}`}>
          {section.title && (
            <Text
              key={section.title}
              title={section.title}
              style={styles.title}
              type={section.titleType}
            />
          )}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <Original style={styles.paragraph} key={`p-${paragraphIndex}`}>
              {paragraph.sentences.map((sentence) =>
                sentence.type === ParagraphType.Link ? (
                  <Text
                    key={sentence.content}
                    title={`${sentence.content} `}
                    onPress={sentence.onPress}
                    style={styles.link}
                  />
                ) : (
                  <Text key={sentence.content} title={`${sentence.content} `} />
                ),
              )}
            </Original>
          ))}
        </View>
      ))}
    </ScrollView>
  );
});
