import {v4} from 'uuid';
import {Item, User} from '../models';

type GetDefaultUserTemplate = {
  user: User;
  items: Item[];
};

const dItem = (u: string): Item => {
  const date = Date.now();
  return {
    id: v4(),
    title: '',
    userId: u,
    description: '',
    active: true,
    createdAt: date,
    updatedAt: date,
    tags: [],
    editable: true,
    children: [],
    type: 'note',
  };
};

const dKanban = (u: string): Item[] => {
  const items: Item[] = [
    {...dItem(u), title: 'Backlog', type: 'list'},
    {...dItem(u), title: 'Todo', type: 'list'},
    {...dItem(u), title: 'In Progress', type: 'list'},
    {...dItem(u), title: 'Done', type: 'list'},
  ];
  return items;
};

export const getDefaultUserTemplate = (): GetDefaultUserTemplate => {
  // user
  const date = Date.now();
  const u = v4();

  // inbox
  const inboxItems: Item[] = [
    {...dItem(u), title: 'do dishes'},
    {...dItem(u), title: 'schedule meeting with Jim'},
    {...dItem(u), title: 'run 4 miles'},
    {...dItem(u), title: 'change oil'},
    {...dItem(u), title: 'what is the best mediation'},
    {...dItem(u), title: 'record Kelly birthday on Sep 22'},
    {...dItem(u), title: 'drink water'},
    {...dItem(u), title: 'intensity + focus = deep work'},
    {...dItem(u), title: 'put $20 in phone'},
    {...dItem(u), title: 'clear emails'},
  ];

  // projects
  const homeTodoItems: Item[] = [
    {...dItem(u), title: 'clean desk'},
    {...dItem(u), title: 'clean room'},
    {...dItem(u), title: 'walk dog'},
    {...dItem(u), title: 'brush teeth'},
    {...dItem(u), title: 'do laundry'},
    {...dItem(u), title: 'fix sink'},
  ];
  const homeItems: Item[] = dKanban(u);
  homeItems[0].children = homeTodoItems.map(i => i.id);
  const townItems: Item[] = dKanban(u);
  const workItems: Item[] = dKanban(u);
  const gymItems: Item[] = dKanban(u);
  const appItems: Item[] = dKanban(u);
  const meetItems: Item[] = [
    {...dItem(u), title: 'one one one'},
    {...dItem(u), title: 'q1 planning'},
  ];
  const bookItems: Item[] = [
    {...dItem(u), title: 'eat that frog'},
    {...dItem(u), title: 'deep work'},
    {...dItem(u), title: 'the one thing'},
  ];
  const giftItems: Item[] = [
    {...dItem(u), title: 'girlfriend'},
    {...dItem(u), title: 'sister'},
    {...dItem(u), title: 'parents'},
  ];
  const checkItems: Item[] = [
    {...dItem(u), title: 'after bathroom'},
    {...dItem(u), title: 'before car'},
    {...dItem(u), title: 'before sleep'},
  ];
  const codeItems: Item[] = [
    {...dItem(u), title: 'php'},
    {...dItem(u), title: 'javascript'},
    {...dItem(u), title: 'swift'},
  ];
  const projectItems: Item[] = [
    {
      ...dItem(u),
      type: 'board',
      title: 'at home',
      children: homeItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'board',
      title: 'at town',
      children: townItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'board',
      title: 'at work',
      children: workItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'board',
      title: 'at gym',
      children: gymItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'board',
      title: 'app release',
      children: appItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'list',
      title: 'meeting notes',
      children: meetItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'list',
      title: 'book notes',
      children: bookItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'list',
      title: 'gift ideas',
      children: giftItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'list',
      title: 'checklists',
      children: checkItems.map(i => i.id),
    },
    {
      ...dItem(u),
      type: 'list',
      title: 'coding',
      children: codeItems.map(i => i.id),
    },
  ];

  // user
  const userItems: Item[] = [
    {
      ...dItem(u),
      title: 'Inbox',
      type: 'list',
      children: inboxItems.map(i => i.id),
      editable: false,
    },
    {
      ...dItem(u),
      title: 'Projects',
      type: 'list',
      children: projectItems.map(i => i.id),
      editable: false,
    },
  ];
  const user: User = {
    id: u,
    active: true,
    email: 'bob@smith.com',
    createdAt: date,
    updatedAt: date,
    name: 'Bob Smith',
    items: userItems.map(i => i.id),
  };

  return {
    user,
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
  };
};
