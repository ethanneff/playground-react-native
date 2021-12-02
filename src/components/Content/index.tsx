import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { v4 } from 'uuid';
import { padding } from '../../features/Config';
import { Sentence } from '../Sentence';
import { Text } from '../Text';
import { Sections } from './types';

type Props = { center?: boolean; sections: Sections };

export const Content = memo(function Content({ sections, center }: Props) {
  const styles = StyleSheet.create({
    paragraph: { paddingBottom: padding(4) },
    section: { paddingBottom: padding(2) },
    title: { paddingBottom: padding(2) },
  });

  return (
    <View>
      {sections.map((section) => (
        <View key={v4()} style={styles.section}>
          {section.title && (
            <Text
              center={center}
              emphasis={section.titleEmphasis}
              style={[styles.title, section.titleStyle]}
              title={section.title}
              type={section.titleType}
            />
          )}
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
