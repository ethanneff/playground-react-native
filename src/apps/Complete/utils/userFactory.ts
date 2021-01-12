import {v4} from 'uuid';
import {Board, Item, List, User} from '../models';

type GetDefaultUserTemplate = {
  user: User;
  boards: Board[];
  lists: List[];
  items: Item[];
};

const date = Date.now();
const userId = v4();
const d = () => ({
  id: v4(),
  userId,
  active: true,
  createdAt: date,
  updatedAt: date,
});

export const getDefaultBoard = (user: string): List[] => {
  const getDefaults = () => ({
    id: v4(),
    userId: user,
    active: true,
    createdAt: date,
    updatedAt: date,
    items: [],
    default: false,
  });

  const board: List[] = [
    {...getDefaults(), title: 'Backlog'},
    {...getDefaults(), title: 'Todo'},
    {...getDefaults(), title: 'In Progress'},
    {...getDefaults(), title: 'Done'},
  ];
  return board;
};

export const getDefaultUserTemplate = (): GetDefaultUserTemplate => {
  // inbox
  const inboxItems: Item[] = [
    {...d(), title: 'do dishes'},
    {...d(), title: 'schedule meeting with Jim'},
    {...d(), title: 'run 4 miles'},
    {...d(), title: 'change oil'},
    {...d(), title: 'what is the best mediation'},
    {...d(), title: 'record Kelly birthday on Sep 22'},
    {...d(), title: 'drink water'},
    {...d(), title: 'intensity + focus = deep work'},
    {...d(), title: 'put $20 in phone'},
    {...d(), title: 'clear emails'},
  ];
  const inboxList: List = {
    ...d(),
    default: true,
    title: 'Inbox',
    items: inboxItems.map((item) => item.id),
  };
  const inboxBoard: Board = {
    ...d(),
    title: 'Inbox',
    lists: [inboxList.id],
  };

  // sub category
  const homeItems: Item[] = [
    {...d(), title: 'clean desk'},
    {...d(), title: 'clean room'},
    {...d(), title: 'walk dog'},
    {...d(), title: 'brush teeth'},
    {...d(), title: 'do laundry'},
    {...d(), title: 'fix sink'},
  ];
  const homeLists: List[] = getDefaultBoard(userId);
  const townLists: List[] = getDefaultBoard(userId);
  const workLists: List[] = getDefaultBoard(userId);
  const gymLists: List[] = getDefaultBoard(userId);
  const appLists: List[] = getDefaultBoard(userId);
  homeLists[0].items = homeItems.map((item) => item.id);
  const homeBoard: Board = {
    ...d(),
    title: 'Home',
    lists: homeLists.map((i) => i.id),
  };
  const townBoard: Board = {
    ...d(),
    title: 'Town',
    lists: townLists.map((i) => i.id),
  };
  const workBoard: Board = {
    ...d(),
    title: 'Work',
    lists: workLists.map((i) => i.id),
  };
  const gymBoard: Board = {
    ...d(),
    title: 'Gym',
    lists: gymLists.map((i) => i.id),
  };
  const appBoard: Board = {
    ...d(),
    title: 'App Release',
    lists: appLists.map((i) => i.id),
  };

  // category
  const projectItems: Item[] = [
    {...d(), title: 'at home', childBoardId: homeBoard.id},
    {...d(), title: 'at town', childBoardId: townBoard.id},
    {...d(), title: 'at work', childBoardId: workBoard.id},
    {...d(), title: 'at gym', childBoardId: gymBoard.id},
    {...d(), title: 'app release', childBoardId: appBoard.id},
  ];

  const projectsList: List = {
    ...d(),
    title: 'Projects',
    default: true,
    items: projectItems.map((item) => item.id),
  };
  const listsItems: Item[] = [
    {...d(), title: 'meeting notes'},
    {...d(), title: 'book summaries'},
    {...d(), title: 'gift ideas'},
    {...d(), title: 'checklists'},
    {...d(), title: 'code languages'},
  ];
  const listsList: List = {
    ...d(),
    title: 'Lists',
    default: true,
    items: listsItems.map((item) => item.id),
  };
  const categoryBoard: Board = {
    ...d(),
    title: 'Categories',
    lists: [projectsList.id, listsList.id],
  };

  // user
  const user: User = {
    ...d(),
    id: userId,
    name: 'Bob Smith',
    boards: [inboxBoard.id, categoryBoard.id],
  };

  return {
    user,
    boards: [
      homeBoard,
      townBoard,
      gymBoard,
      workBoard,
      appBoard,
      inboxBoard,
      categoryBoard,
    ],
    lists: [
      inboxList,
      ...homeLists,
      ...gymLists,
      ...townLists,
      ...workLists,
      ...appLists,
      projectsList,
      listsList,
    ],
    items: [...inboxItems, ...homeItems, ...projectItems, ...listsItems],
  };
};
