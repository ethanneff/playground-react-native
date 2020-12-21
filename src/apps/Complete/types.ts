export type ItemObject = {
  id: string;
  title: string;
};

export type ListObject = {
  title: string;
  id: string;
  items: ItemObject[];
};
