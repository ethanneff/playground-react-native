import {Sections} from './../Content/types';
export type Slide = {
  id: string;
  title?: string;
  sections?: Sections;
  icon?: string;
  backgroundColor?: string;
};
