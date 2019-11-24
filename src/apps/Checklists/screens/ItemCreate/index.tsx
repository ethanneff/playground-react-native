import React, { memo, useState } from "react";
import { Button, Screen, TextInput } from "../../../../components";
import { navigate } from "../../../../models";
import { createItem } from "../../models/Item";
import { useRootDispatch } from "../../../../utils";
import { useNav } from "../../../../hooks";

const initialState = { name: "", description: "" };

export default memo(function CreateItem() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const isInvalidForm =
    form.name.trim().length === 0 || form.description.trim().length === 0;

  const handleSubmit = () => {
    const { name, description } = form;
    if (isInvalidForm) return;
    dispatch(createItem({ name, description }));
    dispatch(navigate("checklistsList"));
  };
  const handleNameChange = (name: string) =>
    setForm(state => ({ ...state, name }));
  const handleDescriptionChange = (description: string) =>
    setForm(state => ({ ...state, description }));

  return (
    <Screen onLeftPress={nav.to("checklistsList")} title="Create Item" gutter>
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
