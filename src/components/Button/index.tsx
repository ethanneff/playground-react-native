import * as React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { Icon, Text } from "..";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: Theme.padding.p4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Theme.padding.p1,
    borderWidth: 1,
    borderColor: "transparent"
  },
  height: {
    height: Theme.padding.p9
  },
  containedBody: {
    backgroundColor: Theme.color.primary
  },
  containedText: {
    color: Theme.color.background
  },
  outlined: {
    borderColor: Theme.color.secondary
  },
  fab: {
    padding: Theme.padding.p4,
    borderRadius: Theme.padding.p8,
    alignSelf: "flex-start"
  },
  text: {
    backgroundColor: "transparent",
    color: Theme.color.primary
  },
  disableBody: {
    backgroundColor: Theme.color.light
  },
  disableText: {
    color: Theme.color.secondary
  },
  half: {
    width: "50%"
  },
  nonFlex: {
    alignSelf: "flex-start"
  },
  center: {
    alignSelf: "center"
  },
  neutral: {
    color: Theme.color.text
  },
  icon: {
    paddingRight: Theme.padding.p1
  }
});

// styling: https://material.io/design/components/buttons.html#usage
interface Props {
  // content
  title?: string;
  icon?: string;
  // styling
  buttonStyle?: ViewStyle | {};
  textStyle?: TextStyle | {};
  iconColor?: string;
  // state
  active?: boolean;
  disable?: boolean;
  // shape
  text?: boolean; // low emphasis
  outlined?: boolean; // mid emphasis
  contained?: boolean; // high emphasis
  fab?: boolean;
  toggle?: boolean;
  // color
  neutral?: boolean;
  // size
  wrap?: boolean;
  half?: boolean;
  full?: boolean;
  center?: boolean;
  // event
  onPress(): void;
}

export class Button extends React.PureComponent<Props> {
  public getShape() {
    const { contained, outlined, fab, text } = this.props;
    if (contained) {
      return styles.containedBody;
    }
    if (outlined) {
      return styles.outlined;
    }
    if (fab) {
      return styles.fab;
    }
    if (text) {
      return styles.text;
    }
    return styles.text;
  }

  public render() {
    const {
      title,
      onPress,
      disable,
      buttonStyle,
      textStyle,
      contained,
      outlined,
      wrap,
      fab,
      neutral,
      half,
      center,
      icon,
      iconColor
    } = this.props;
    const disableBodyStyle =
      disable && (contained || outlined) ? styles.disableBody : undefined;
    const disableTextStyle = disable ? styles.disableText : undefined;
    const wrapStyle = wrap ? styles.nonFlex : undefined;
    const containedStyle = contained ? styles.containedText : undefined;
    const fabStyle = fab ? styles.fab : undefined;
    const neutralStyle = neutral ? styles.neutral : undefined;
    const halfStyle = half ? styles.half : undefined;
    const centerStyle = center ? styles.center : undefined;
    const shapeStyle = this.getShape();
    const heightStyle = !fab ? styles.height : undefined;
    const textStyleGroup = [
      styles.text,
      neutralStyle,
      containedStyle,
      disableTextStyle,
      textStyle
    ];
    return (
      <TouchableOpacity
        style={[
          styles.container,
          heightStyle,
          shapeStyle,
          disableBodyStyle,
          fabStyle,
          wrapStyle,
          halfStyle,
          centerStyle,
          buttonStyle
        ]}
        onPress={onPress}
        disabled={disable}
      >
        {icon && (
          <Icon
            color={iconColor}
            name={icon}
            size={Theme.padding.p4}
            style={[title && styles.icon, textStyleGroup]}
          />
        )}
        {title && <Text center button title={title} style={textStyleGroup} />}
      </TouchableOpacity>
    );
  }
}
