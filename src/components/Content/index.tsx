import React, { memo } from "react";
import { Text as Original, ScrollView, StyleSheet, View } from "react-native";
import { Theme } from "../../utils";
import { Text } from "../Text";
import { useColor } from "../../hooks";

export interface ContentBody {
  sections: Sections;
}
type Sections = Section[];
interface Section {
  title: string;
  titleType: TitleType;
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
  Link
}

export enum TitleType {
  H1,
  H2,
  H3
}

interface Props {
  body: ContentBody;
}

export const Content: React.FC<Props> = memo(({ body }) => {
  const color = useColor();
  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: Theme.padding.p04
    },
    link: {
      color: color.primary
    },
    paragraph: {
      paddingBottom: Theme.padding.p02
    },
    section: {
      paddingBottom: Theme.padding.p04
    },
    title: {
      paddingBottom: Theme.padding.p02
    }
  });

  const renderSentence = (sentence: Sentence) =>
    sentence.type === ParagraphType.Link ? 
      <Text
        key={sentence.content}
        title={`${sentence.content} `}
        onPress={sentence.onPress}
        style={styles.link}
      />
     : 
      <Text key={sentence.content} title={`${sentence.content} `} />
    ;

  const renderParagraph = (paragraph: Paragraph) => 
    <Original style={styles.paragraph} key={Math.random()}>
      {paragraph.sentences.map(renderSentence)}
    </Original>
  ;

  const renderSection = (section: Section) => 
    <View style={styles.section} key={Math.random()}>
      {section.title && 
        <Text
          key={section.title}
          title={section.title}
          style={styles.title}
          h1={section.titleType === TitleType.H1}
          h2={section.titleType === TitleType.H2}
          h3={section.titleType === TitleType.H3}
        />
      }
      {section.paragraphs.map(renderParagraph)}
    </View>
  ;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {body.sections.map(renderSection)}
    </ScrollView>
  );
});
