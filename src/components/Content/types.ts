import { StyleProp, ViewStyle } from 'react-native';
import { FontEmphasis, FontType } from '../../features/Config/index';
import { SentenceType } from './../Sentence/types';

export type Sections = {
  paragraphs: SentenceType[][];
  title?: string;
  titleEmphasis?: FontEmphasis;
  titleStyle?: StyleProp<ViewStyle>;
  titleType?: FontType;
}[];
