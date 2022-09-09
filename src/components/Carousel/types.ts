import { ContentSections } from '../Content';
import { IconName } from '../Icon';

export type CarouselSlide = {
  backgroundColor?: string;
  icon?: IconName;
  id: string;
  sections?: ContentSections;
  title?: string;
};
