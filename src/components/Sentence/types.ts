import {FontEmphasis, FontType} from '../../features/Config';
export type SentenceType = {
  title: string;
  bold?: boolean;
  type?: FontType;
  emphasis?: FontEmphasis;
  onPress?: () => void;
};
