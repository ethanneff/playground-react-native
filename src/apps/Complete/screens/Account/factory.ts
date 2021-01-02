import {v4} from 'uuid';
import {Board, Item, List, User} from '../../models';

type GetDefaultUserTemplate = {
  user: User;
  boards: Board[];
  lists: List[];
  items: Item[];
};

const date = Date.now();
const defaults = () => ({
  id: v4(),
  active: true,
  createdAt: date,
  updatedAt: date,
});

export const getDefaultUserTemplate = (): GetDefaultUserTemplate => {
  // inbox
  const inboxItems: Item[] = [
    {...defaults(), title: 'do dishes'},
    {...defaults(), title: 'schedule meeting with Jim'},
    {...defaults(), title: 'run 4 miles'},
    {...defaults(), title: 'change oil'},
    {...defaults(), title: 'what is the best mediation'},
    {...defaults(), title: 'record Kelly birthday on Sep 22'},
    {...defaults(), title: 'drink water'},
    {...defaults(), title: 'intensity + focus = deep work'},
    {...defaults(), title: 'put $20 in phone'},
    {...defaults(), title: 'clear emails'},
  ];
  const inboxList: List = {
    ...defaults(),
    title: 'Inbox',
    items: inboxItems.map((item) => item.id),
  };
  const inboxBoard: Board = {
    ...defaults(),
    title: 'Inbox',
    lists: [inboxList.id],
  };

  // sub category
  const homeItems: Item[] = [
    {...defaults(), title: 'clean desk'},
    {...defaults(), title: 'clean room'},
    {...defaults(), title: 'walk dog'},
    {...defaults(), title: 'brush teeth'},
    {...defaults(), title: 'do laundry'},
    {...defaults(), title: 'fix sink'},
  ];
  const homeLists: List[] = [
    {...defaults(), title: 'Backlog', items: homeItems.map((item) => item.id)},
    {...defaults(), title: 'Todo', items: []},
    {...defaults(), title: 'In Progress', items: []},
    {...defaults(), title: 'Done', items: []},
  ];
  const homeBoard: Board = {
    ...defaults(),
    title: 'Home',
    lists: homeLists.map((item) => item.id),
  };

  // category
  const projectItems: Item[] = [
    {...defaults(), title: 'at home', board: homeBoard.id},
    {...defaults(), title: 'at town'},
    {...defaults(), title: 'at work'},
    {...defaults(), title: 'at gym'},
    {...defaults(), title: 'app release'},
  ];
  const projectsList: List = {
    ...defaults(),
    title: 'Projects',
    items: projectItems.map((item) => item.id),
  };
  const listsItems: Item[] = [
    {...defaults(), title: 'meeting notes'},
    {...defaults(), title: 'book summaries'},
    {...defaults(), title: 'gift ideas'},
    {...defaults(), title: 'checklists'},
    {...defaults(), title: 'code languages'},
  ];
  const listsList: List = {
    ...defaults(),
    title: 'Lists',
    items: listsItems.map((item) => item.id),
  };
  const categoryBoard: Board = {
    ...defaults(),
    title: 'Categories',
    lists: [projectsList.id, listsList.id],
  };

  // user
  const user: User = {
    ...defaults(),
    name: 'Bob Smith',
    boards: [inboxBoard.id, categoryBoard.id],
  };

  return {
    user,
    boards: [homeBoard, inboxBoard, categoryBoard],
    lists: [inboxList, ...homeLists, projectsList, listsList],
    items: [...inboxItems, ...homeItems, ...projectItems, ...listsItems],
  };
};
