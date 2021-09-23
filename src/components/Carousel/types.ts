import { Sections } from './../Content/types';

export type CarouselSlide = {
  id: string;
  title?: string;
  sections?: Sections;
  icon?: string;
  backgroundColor?: string;
};
