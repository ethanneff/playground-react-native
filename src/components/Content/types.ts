import {FontEmphasis, FontType} from './../../utils/Config/index';
import {SentenceType} from './../Sentence/types';

export type Sections = {
  title?: string;
  titleType?: FontType;
  titleEmphasis?: FontEmphasis;
  paragraphs: SentenceType[][];
}[];
