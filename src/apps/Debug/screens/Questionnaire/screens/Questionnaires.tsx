import React, { useState, useCallback } from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Card, Dialog, Text } from "../../../../../components";
import { RootState } from "../../../../../containers";
import {
  Questionnaire,
  createQuestionnaire,
  getQuestionnaireArray,
  removeQuestionnaire,
  selectQuestionnaire,
  updateQuestionnaire
} from "../models";

interface StateProps {
  questionnaires: Questionnaire[];
  selected?: string;
}
interface DispatchProps {
  removeQuestionnaire: typeof removeQuestionnaire;
  selectQuestionnaire: typeof selectQuestionnaire;
  updateQuestionnaire: typeof updateQuestionnaire;
  createQuestionnaire: typeof createQuestionnaire;
}
type Props = StateProps & DispatchProps;

const Container = (props: Props) => {
  const [actionSheet, setActionSheet] = useState(false);
  const handleLongPress = useCallback(
    (id: string) => () => props.removeQuestionnaire(id),
    [props]
  );
  const handleItemPress = useCallback(
    (id: string) => () => props.selectQuestionnaire(id),
    [props]
  );
  const handleActionSheetClose = useCallback(() => setActionSheet(false), []);
  const handleCreate = useCallback(
    () => props.createQuestionnaire(String(Date.now())),
    [props]
  );
  const handleItemMenu = useCallback(() => {
    setActionSheet(state => !state);
  }, []);
  const renderItem = useCallback(
    ({ item }) => {
      const length = item.questions.length;
      const subtitle = `${length} question${length === 1 ? "" : "s"}`;
      return (
        <Card
          onPress={handleItemPress(item.id)}
          onLongPress={handleLongPress(item.id)}
          selected={props.selected === item.id}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flex: 0.9 }}>
              <Text h3 title={item.title} />
              <Text caption title={subtitle} />
            </View>
            <Button icon="dots-horizontal" onPress={handleItemMenu} />
          </View>
        </Card>
      );
    },
    [handleItemMenu, handleItemPress, handleLongPress, props.selected]
  );

  return (
    <>
      <FlatList
        keyExtractor={item => item.id}
        data={props.questionnaires}
        extraData={props.selected}
        renderItem={renderItem}
      />
      <Button
        icon="plus"
        fab
        contained
        right
        dropShadow
        onPress={handleCreate}
      />
      {actionSheet && 
        <Dialog title="hello" onBackgroundPress={handleActionSheetClose} />
      }
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  questionnaires: getQuestionnaireArray(state),
  selected: state.questionnaires.selected
});

const mapDispatchToProps: DispatchProps = {
  createQuestionnaire,
  removeQuestionnaire,
  selectQuestionnaire,
  updateQuestionnaire
};

export const Questionnaires = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
