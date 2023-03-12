import { v4 } from 'uuid';
import { type Item, type User } from '../models';

type GetDefaultUserTemplate = {
  items: Item[];
  user: User;
};

const dItem = (u: string): Item => {
  const date = Date.now();
  return {
    active: true,
    children: [],
    createdAt: date,
    description: '',
    editable: true,
    id: v4(),
    tags: [],
    title: '',
    type: 'note',
    updatedAt: date,
    userId: u,
  };
};

const dKanban = (u: string): Item[] => {
  const items: Item[] = [
    { ...dItem(u), title: 'Backlog', type: 'list' },
    { ...dItem(u), title: 'Todo', type: 'list' },
    { ...dItem(u), title: 'In Progress', type: 'list' },
    { ...dItem(u), title: 'Done', type: 'list' },
  ];
  return items;
};

export const getDefaultUserTemplate = (): GetDefaultUserTemplate => {
  // User
  const date = Date.now();
  const u = v4();

  // Inbox
  const inboxItems: Item[] = [
    { ...dItem(u), title: 'do dishes' },
    { ...dItem(u), title: 'schedule meeting with Jim' },
    { ...dItem(u), title: 'run 4 miles' },
    { ...dItem(u), title: 'change oil' },
    { ...dItem(u), title: 'what is the best mediation' },
    { ...dItem(u), title: 'record Kelly birthday on Sep 22' },
    { ...dItem(u), title: 'drink water' },
    { ...dItem(u), title: 'intensity + focus = deep work' },
    { ...dItem(u), title: 'put $20 in phone' },
    { ...dItem(u), title: 'clear emails' },
  ];

  // Projects
  const homeTodoItems: Item[] = [
    { ...dItem(u), title: 'clean desk' },
    { ...dItem(u), title: 'clean room' },
    { ...dItem(u), title: 'walk dog' },
    { ...dItem(u), title: 'brush teeth' },
    { ...dItem(u), title: 'do laundry' },
    { ...dItem(u), title: 'fix sink' },
  ];
  const homeItems: Item[] = dKanban(u).map((item, index) =>
    index === 0 ? { ...item, children: homeTodoItems.map((i) => i.id) } : item,
  );
  const townItems: Item[] = dKanban(u);
  const workItems: Item[] = dKanban(u);
  const gymItems: Item[] = dKanban(u);
  const appItems: Item[] = dKanban(u);
  const meetItems: Item[] = [
    { ...dItem(u), title: 'one one one' },
    { ...dItem(u), title: 'q1 planning' },
  ];
  const bookItems: Item[] = [
    { ...dItem(u), title: 'eat that frog' },
    { ...dItem(u), title: 'deep work' },
    { ...dItem(u), title: 'the one thing' },
  ];
  const giftItems: Item[] = [
    { ...dItem(u), title: 'girlfriend' },
    { ...dItem(u), title: 'sister' },
    { ...dItem(u), title: 'parents' },
  ];
  const checkItems: Item[] = [
    { ...dItem(u), title: 'after bathroom' },
    { ...dItem(u), title: 'before car' },
    { ...dItem(u), title: 'before sleep' },
  ];
  const codeItems: Item[] = [
    { ...dItem(u), title: 'php' },
    { ...dItem(u), title: 'javascript' },
    { ...dItem(u), title: 'swift' },
  ];
  const projectItems: Item[] = [
    {
      ...dItem(u),
      children: homeItems.map((i) => i.id),
      title: 'at home',
      type: 'board',
    },
    {
      ...dItem(u),
      children: townItems.map((i) => i.id),
      title: 'at town',
      type: 'board',
    },
    {
      ...dItem(u),
      children: workItems.map((i) => i.id),
      title: 'at work',
      type: 'board',
    },
    {
      ...dItem(u),
      children: gymItems.map((i) => i.id),
      title: 'at gym',
      type: 'board',
    },
    {
      ...dItem(u),
      children: appItems.map((i) => i.id),
      title: 'app release',
      type: 'board',
    },
    {
      ...dItem(u),
      children: meetItems.map((i) => i.id),
      title: 'meeting notes',
      type: 'list',
    },
    {
      ...dItem(u),
      children: bookItems.map((i) => i.id),
      title: 'book notes',
      type: 'list',
    },
    {
      ...dItem(u),
      children: giftItems.map((i) => i.id),
      title: 'gift ideas',
      type: 'list',
    },
    {
      ...dItem(u),
      children: checkItems.map((i) => i.id),
      title: 'checklists',
      type: 'list',
    },
    {
      ...dItem(u),
      children: codeItems.map((i) => i.id),
      title: 'coding',
      type: 'list',
    },
  ];

  // User
  const userItems: Item[] = [
    {
      ...dItem(u),
      children: inboxItems.map((i) => i.id),
      editable: false,
      title: 'Inbox',
      type: 'list',
    },
    {
      ...dItem(u),
      children: projectItems.map((i) => i.id),
      editable: false,
      title: 'Projects',
      type: 'list',
    },
  ];
  const user: User = {
    active: true,
    createdAt: date,
    email: 'bob@smith.com',
    id: u,
    items: userItems.map((i) => i.id),
    name: 'Bob Smith',
    updatedAt: date,
  };

  return {
    items: [
      ...inboxItems,
      ...homeTodoItems,
      ...homeItems,
      ...townItems,
      ...workItems,
      ...gymItems,
      ...appItems,
      ...meetItems,
      ...bookItems,
      ...giftItems,
      ...checkItems,
      ...codeItems,
      ...projectItems,
      ...userItems,
    ],
    user,
  };
};
