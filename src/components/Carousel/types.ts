import { type ContentSections } from '../Content';
import { type IconName } from '../Icon';

export type CarouselSlide = {
  backgroundColor?: string;
  icon?: IconName;
  id: string;
  sections?: ContentSections;
  title?: string;
};
