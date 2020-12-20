import {v4} from 'uuid';
import {Board, Group, Item, List, User} from '../../models';

type GetDefaultUserTemplate = {
  user: User;
  boards: Board[];
  lists: List[];
  items: Item[];
  groups: Group[];
};

export const getDefaultUserTemplate = (): GetDefaultUserTemplate => {
  const date = Date.now();

  const inboxItems: Item[] = [
    {
      id: v4(),
      name: 'do dishes',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'schedule meeting with Jim',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'run 4 miles',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'change oil',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'what is the best mediation',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'record Kelly birthday on Sep 22',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
  ];

  const homeItems: Item[] = [
    {
      id: v4(),
      name: 'clean desk',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'clean room',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'walk dog',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'brush teeth',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'do laundry',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      name: 'fix sink',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
  ];

  const items: Item[] = [...homeItems, ...inboxItems];

  const inboxList: List = {
    id: v4(),
    name: 'Inbox',
    createdAt: date,
    updatedAt: date,
    active: true,
    items: inboxItems.map((item) => item.id),
  };

  const homeLists: List[] = [
    {
      id: v4(),
      name: 'Backlog',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: homeItems.map((item) => item.id),
    },
    {
      id: v4(),
      name: 'Todo',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: [],
    },
    {
      id: v4(),
      name: 'In Progress',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: [],
    },
    {
      id: v4(),
      name: 'Done',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: [],
    },
  ];

  const lists: List[] = [...homeLists, inboxList];

  const boards: Board[] = [
    {
      id: v4(),
      name: 'home',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: lists.map((list) => list.id),
    },
    {
      id: v4(),
      name: 'work',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'gym',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'groceries',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'gift ideas',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'checklists',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'meeting notes',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'receipts',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      name: 'book summaries',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
  ];

  const groups: Group[] = [
    {
      id: v4(),
      name: 'Actionable',
      active: true,
      createdAt: date,
      updatedAt: date,
      boards: boards.filter((_, index) => index < 4).map((board) => board.id),
    },
    {
      id: v4(),
      name: 'Storage',
      active: true,
      createdAt: date,
      updatedAt: date,
      boards: boards.filter((_, index) => index >= 4).map((board) => board.id),
    },
  ];

  const user: User = {
    id: v4(),
    name: 'Bob Smith',
    active: true,
    createdAt: date,
    updatedAt: date,
    inbox: inboxList.id,
    groups: groups.map((group) => group.id),
  };

  return {user, boards, lists, items, groups};
};
