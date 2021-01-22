import {FontEmphasis, FontType} from '../../utils';
export type SentenceType = {
  title: string;
  bold?: boolean;
  type?: FontType;
  emphasis?: FontEmphasis;
  onPress?: () => void;
};
