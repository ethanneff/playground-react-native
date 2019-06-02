import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { Text } from "../../../../../../components";
import { RootState } from "../../../../../../containers";
import { Theme } from "../../../../../../utils";

interface StateProps {
  image: ImageSourcePropType;
  width: number;
  level: number;
  state: RootState;
}

interface OwnProps {
  onPress?(): void;
}

type Props = OwnProps & StateProps;

class Component extends React.PureComponent<Props> {
  private readonly styles = StyleSheet.create({
    imageContainer: {
      alignSelf: "center",
      borderColor: Theme.color.secondary,
      borderRadius: Theme.padding.p02,
      borderWidth: 1,
      height: Theme.padding.p18,
      justifyContent: "center",
      resizeMode: "contain",
      width: Theme.padding.p18
    },
    levelContainer: {
      backgroundColor: Theme.color.background,
      borderColor: Theme.color.secondary,
      borderRadius: Theme.padding.p20,
      borderWidth: 1,
      bottom: -Theme.padding.p02,
      elevation: 2,
      height: Theme.padding.p08,
      justifyContent: "center",
      position: "absolute",
      width: Theme.padding.p08,
      zIndex: 2
    },
    progressBar: {
      backgroundColor: Theme.color.success,
      borderBottomLeftRadius: 0,
      borderRadius: Theme.padding.p20,
      borderTopLeftRadius: 0,
      height: "100%"
    },
    progressContainer: {
      backgroundColor: Theme.color.background,
      borderBottomLeftRadius: 0,
      borderColor: Theme.color.secondary,
      borderRadius: Theme.padding.p20,
      borderTopLeftRadius: 0,
      borderWidth: 1,
      height: Theme.padding.p04,
      marginLeft: 30,
      marginTop: -Theme.padding.p01,
      width: Theme.padding.p16
    }
  });

  public render() {
    const { image, width, level, onPress } = this.props;
    const {
      imageContainer,
      progressContainer,
      progressBar,
      levelContainer
    } = this.styles;
    return (
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <Image source={image} style={imageContainer} />
        <View>
          <View style={progressContainer}>
            <View style={[progressBar, { width }]} />
          </View>
          <View style={levelContainer}>
            <Text title={String(level)} subtitle2 center />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  image: require("../../../../../../assets/placeholder.png"),
  level: 22,
  state,
  width: 0.2
});

export const ProfileLevel = connect(mapStateToProps)(Component);
