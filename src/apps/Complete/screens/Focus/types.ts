export type CardObject = {
  id: string;
  name: string;
};

export type ListObject = {
  name: string;
  id: string;
  items: CardObject[];
};
