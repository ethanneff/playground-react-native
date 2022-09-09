import { StyleProp, ViewStyle } from 'react-native';
import { FontEmphasis, FontType } from '../../features';
import { SentenceType } from '../Sentence';

export type ContentSections = {
  paragraphs: SentenceType[][];
  title?: string;
  titleEmphasis?: FontEmphasis;
  titleStyle?: StyleProp<ViewStyle>;
  titleType?: FontType;
}[];
