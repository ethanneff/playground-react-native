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
      title: 'do dishes',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'schedule meeting with Jim',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'run 4 miles',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'change oil',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'what is the best mediation',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'record Kelly birthday on Sep 22',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
  ];

  const homeItems: Item[] = [
    {
      id: v4(),
      title: 'clean desk',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'clean room',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'walk dog',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'brush teeth',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'do laundry',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
    {
      id: v4(),
      title: 'fix sink',
      createdAt: date,
      updatedAt: date,
      active: true,
    },
  ];

  const items: Item[] = [...homeItems, ...inboxItems];

  const inboxList: List = {
    id: v4(),
    title: 'Inbox',
    createdAt: date,
    updatedAt: date,
    active: true,
    items: inboxItems.map((item) => item.id),
  };

  const homeLists: List[] = [
    {
      id: v4(),
      title: 'Backlog',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: homeItems.map((item) => item.id),
    },
    {
      id: v4(),
      title: 'Todo',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: [],
    },
    {
      id: v4(),
      title: 'In Progress',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: [],
    },
    {
      id: v4(),
      title: 'Done',
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
      title: 'At home',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: lists.map((list) => list.id),
    },
    {
      id: v4(),
      title: 'At work',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'At gym',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'At town',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'gift ideas',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'checklists',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'meeting notes',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'receipts',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
    {
      id: v4(),
      title: 'book summaries',
      createdAt: date,
      updatedAt: date,
      active: true,
      lists: [],
    },
  ];

  const groups: Group[] = [
    {
      id: v4(),
      title: 'Boards',
      active: true,
      createdAt: date,
      updatedAt: date,
      boards: boards.filter((_, index) => index < 4).map((board) => board.id),
    },
    {
      id: v4(),
      title: 'Checklists',
      active: true,
      createdAt: date,
      updatedAt: date,
      boards: boards.filter((_, index) => index >= 4).map((board) => board.id),
    },
    {
      id: v4(),
      title: 'Notes',
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
