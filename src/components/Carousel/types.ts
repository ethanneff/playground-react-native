import { Sections } from '../Content/types';
import { IconName } from '../Icon';

export type CarouselSlide = {
  backgroundColor?: string;
  icon?: IconName;
  id: string;
  sections?: Sections;
  title?: string;
};
