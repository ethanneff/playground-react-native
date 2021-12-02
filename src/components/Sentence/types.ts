import { FontEmphasis, FontType } from '../../features/Config';
export type SentenceType = {
  bold?: boolean;
  emphasis?: FontEmphasis;
  onPress?: () => void;
  title: string;
  type?: FontType;
};
