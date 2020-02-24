import React, { memo, useState } from "react";
import { Button, Screen, TextInput } from "../../../../components";
import { navigate } from "../../../../models";
import { useRootDispatch } from "../../../../utils";
import { useNav } from "../../../../hooks";
import { createList } from "../../models";
import { v4 } from "uuid";

const initialState = { name: "", description: "" };

export default memo(function ChecklistCreate() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const isInvalidForm = form.name.trim().length === 0;

  const handleSubmit = () => {
    const { name, description } = form;
    if (isInvalidForm) {
      return;
    }
    const now = Date.now();
    dispatch(
      createList({
        id: v4(),
        name,
        active: true,
        userId: "1",
        description,
        createdAt: now,
        updatedAt: now
      })
    );
    dispatch(navigate("checklists"));
  };
  const handleNameChange = (name: string) =>
    setForm(state => ({ ...state, name }));
  const handleDescriptionChange = (description: string) =>
    setForm(state => ({ ...state, description }));

  return (
    <Screen onLeftPress={nav.to("checklists")} title="Create Checklist" gutter>
      <TextInput
        title="name"
        value={form.name}
        onChangeText={handleNameChange}
      />
      <TextInput
        title="description"
        value={form.description}
        onChangeText={handleDescriptionChange}
      />
      <Button title="create" onPress={handleSubmit} />
    </Screen>
  );
});
