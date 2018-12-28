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
    const buttonStyleGroup = [
      styles.container,
      !fab && styles.height,
      this.getShape(),
      disable && (contained || outlined) && styles.disableBody,
      fab && styles.fab,
      wrap && styles.nonFlex,
      half && styles.half,
      center && styles.center,
      buttonStyle
    ];
    const textStyleGroup = [
      styles.text,
      neutral && styles.neutral,
      contained && styles.containedText,
      disable && styles.disableText,
      textStyle
    ];
    const iconStyleGroup = [title && styles.icon, !iconColor && textStyleGroup];
    return (
      <TouchableOpacity
        style={buttonStyleGroup}
        onPress={onPress}
        disabled={disable}
      >
        <Icon
          color={iconColor}
          name={icon}
          size={Theme.padding.p4}
          style={iconStyleGroup}
        />
        <Text center button title={title} style={textStyleGroup} />
      </TouchableOpacity>
    );
  }
}
