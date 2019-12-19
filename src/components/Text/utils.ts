import { TextProps } from ".";
import { Theme } from "../../utils";

export const getFontSize = (props: TextProps) =>
  props.h1
    ? Theme.fontSize.h1
    : props.h2
    ? Theme.fontSize.h2
    : props.h3
    ? Theme.fontSize.h3
    : props.h4
    ? Theme.fontSize.h4
    : props.h5
    ? Theme.fontSize.h5
    : props.h6
    ? Theme.fontSize.h6
    : props.subtitle1
    ? Theme.fontSize.subtitle1
    : props.subtitle2
    ? Theme.fontSize.subtitle2
    : props.body1
    ? Theme.fontSize.body1
    : props.body2
    ? Theme.fontSize.body2
    : props.button
    ? Theme.fontSize.button
    : props.caption
    ? Theme.fontSize.caption
    : props.overline
    ? Theme.fontSize.overline
    : Theme.fontSize.body2;

export const getTextColorPercent = (props: TextProps) =>
  props.high ? 0.87 : props.medium ? 0.6 : props.low ? 0.38 : 1.0;
