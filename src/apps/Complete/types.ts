export type ItemObject = {
  id: string;
  name: string;
};

export type ListObject = {
  name: string;
  id: string;
  items: ItemObject[];
};
