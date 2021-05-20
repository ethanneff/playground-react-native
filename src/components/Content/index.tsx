import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {padding} from '../../utils';
import {Sentence} from '../Sentence';
import {Text} from '../Text';
import {Sections} from './types';

type Props = {sections: Sections; center?: boolean};

export const Content = memo(function Content({sections, center}: Props) {
  const styles = StyleSheet.create({
    paragraph: {paddingBottom: padding(4)},
    section: {paddingBottom: padding(2)},
    title: {paddingBottom: padding(2)},
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
              style={[styles.title, section.titleStyle]}
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
