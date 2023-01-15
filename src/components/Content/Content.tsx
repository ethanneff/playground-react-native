import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { v4 } from 'uuid';
import { View } from '..';
import { spacing } from '../../features';
import { Sentence } from '../Sentence';
import { Text } from '../Text';
import { type ContentSections } from './types';

type Props = {
  center?: boolean;
  sections: ContentSections;
};

export const Content = memo(function Content({ center, sections }: Props) {
  const styles = StyleSheet.create({
    paragraph: { paddingBottom: spacing(4) },
    section: { paddingBottom: spacing(2) },
    title: { paddingBottom: spacing(2) },
  });

  return (
    <View>
      {sections.map((section) => (
        <View
          key={v4()}
          style={styles.section}
        >
          {section.title ? (
            <Text
              center={center}
              emphasis={section.titleEmphasis}
              style={[styles.title, section.titleStyle]}
              title={section.title}
              type={section.titleType}
            />
          ) : null}
          {section.paragraphs.map((paragraph) => (
            <Sentence
              center={center}
              key={v4()}
              sentences={paragraph}
              style={styles.paragraph}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
