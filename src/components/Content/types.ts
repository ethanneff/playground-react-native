import { type StyleProp, type ViewStyle } from 'react-native';
import { type FontEmphasis, type FontType } from '../../features';
import { type SentenceType } from '../Sentence';

export type ContentSections = {
  paragraphs: SentenceType[][];
  title?: string;
  titleEmphasis?: FontEmphasis;
  titleStyle?: StyleProp<ViewStyle>;
  titleType?: FontType;
}[];
