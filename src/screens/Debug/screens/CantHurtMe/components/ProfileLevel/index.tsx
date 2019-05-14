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
import { RootState } from "../../../../../../models";
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
      borderRadius: Theme.padding.p02,
      borderColor: Theme.color.secondary,
      borderWidth: 1,
      alignSelf: "center",
      height: Theme.padding.p18,
      justifyContent: "center",
      width: Theme.padding.p18,
      resizeMode: "contain"
    },
    progressContainer: {
      borderColor: Theme.color.secondary,
      borderRadius: Theme.padding.p20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderWidth: 1,
      marginTop: -Theme.padding.p01,
      marginLeft: 30,
      height: Theme.padding.p04,
      width: Theme.padding.p16,
      backgroundColor: Theme.color.background
    },
    progressBar: {
      backgroundColor: Theme.color.success,
      borderRadius: Theme.padding.p20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      height: "100%"
    },
    levelContainer: {
      backgroundColor: Theme.color.background,
      borderRadius: Theme.padding.p20,
      borderWidth: 1,
      borderColor: Theme.color.secondary,
      bottom: -Theme.padding.p02,
      elevation: 2,
      height: Theme.padding.p08,
      width: Theme.padding.p08,
      justifyContent: "center",
      position: "absolute",
      zIndex: 2
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
  width: 0.2,
  level: 22,
  state
});

export const ProfileLevel = connect(mapStateToProps)(Component);
