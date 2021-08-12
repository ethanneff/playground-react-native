import {StyleProp, ViewStyle} from 'react-native';
import {FontEmphasis, FontType} from '../../features/Config/index';
import {SentenceType} from './../Sentence/types';

export type Sections = {
  title?: string;
  titleType?: FontType;
  titleStyle?: StyleProp<ViewStyle>;
  titleEmphasis?: FontEmphasis;
  paragraphs: SentenceType[][];
}[];
