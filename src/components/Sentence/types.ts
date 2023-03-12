import { type FontEmphasis, type FontType } from '../../features';
export type SentenceType = {
  bold?: boolean;
  emphasis?: FontEmphasis;
  onPress?: () => void;
  title: string;
  type?: FontType;
};
