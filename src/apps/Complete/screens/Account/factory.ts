import {v4} from 'uuid';
import {Board, Group, Item, List, User} from '../../models';

export const getDefaultUserTemplate = () => {
  const date = Date.now();

  const items: Item[] = [
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

  const lists: List[] = [
    {
      id: v4(),
      name: 'Backlog',
      createdAt: date,
      updatedAt: date,
      active: true,
      items: items.map((item) => item.id),
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
    groups: groups.map((group) => group.id),
  };

  return {user, boards, lists, items, groups};
};
