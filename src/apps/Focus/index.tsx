import React, { memo, useCallback, useState } from "react";
import { Dialog, Screen, Text } from "../../components";
import { navigate, NavigationScreen } from "../../models";
import { useRootDispatch } from "../../utils";
import { List } from "./components/List";

// TODO: highlight current index
// TODO: scroll to current index
// TODO: migrate all dialogs to Dialogs (remove modals from navigation layer)
// TODO: batch item list
// TODO: handle modals
// TODO: flatlist on web

export const Focus = memo(() => {
  const dispatch = useRootDispatch();
  const [modalItemEdit, setModalItemEdit] = useState(false);
  const [modalProfile] = useState(false);
  const [modalLogin] = useState(false);
  const nav = (to: NavigationScreen) => () => dispatch(navigate(to));
  const handleItemPress = useCallback(() => {
    // flatList.scrollToIndex(20);
    setModalItemEdit(edit => !edit);
  }, []);
  const handleModalEditBackgroundPress = useCallback(() => {
    setModalItemEdit(false);
  }, []);

  return (
    <>
      <Screen
        onLeftPress={nav(NavigationScreen.PortfolioLanding)}
        disableScroll
      >
        <Text h1 title="fc" center />
        <List onItemPress={handleItemPress} />
      </Screen>
      {modalItemEdit && (
        <Dialog
          duration={2000}
          testID="editItem"
          title="hello"
          onBackgroundPress={handleModalEditBackgroundPress}
        />
      )}
      {modalProfile && (
        <Dialog
          testID="editItem"
          title="hello"
          onBackgroundPress={handleModalEditBackgroundPress}
        />
      )}
      {modalLogin && (
        <Dialog
          testID="editItem"
          title="hello"
          onBackgroundPress={handleModalEditBackgroundPress}
        />
      )}
    </>
  );
});
