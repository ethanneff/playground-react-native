type Source = {
  id: string;
  title: string;
  url: string;
};

type Reminder = {
  day: string;
  id: string;
  time: string;
};

type Tag = {
  id: string;
  name: string;
};

type ChecklistItemStatus = 'Done' | 'InProgress' | 'Reminded' | 'Todo';

type ChecklistItemHistory = {
  createdAt: number;
  id: string;
  itemId: number;
  status: ChecklistItemStatus;
  updatedAt: number;
};

type ChecklistItemHistories = Record<string, ChecklistItemHistory>;

type Reminders = Record<string, Reminder>;

type Sources = Record<string, Source>;

type ChecklistItem = {
  active: boolean;
  checklistId: string;
  history?: ChecklistItemHistories;
  id: string;
  reminder?: Reminders;
  source: Sources;
  status: ChecklistItemStatus;
  title: string;
};

type Checklist = {
  completedAt: string[];
  createdAt: string;
  id: string;
  items: string[];
  tags: string[];
  updatedAt: string;
  userId: string;
  viewedAt: string[];
};

type User = {
  checklists: string[];
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};

export type ChecklistItems = Record<string, ChecklistItem>;

export type Checklists = Record<string, Checklist>;

export type Tags = Record<string, Tag>;

export const user: User = {
  checklists: [],
  email: 'bob.smith@email.com',
  firstName: 'bob',
  id: '123',
  lastName: 'smith',
};

export const data = {
  '3': {
    items: {
      '1': {
        sources: {},
        title: 'read',
      },
      '2': {
        title: 'remove teeth',
      },
    },
    reminders: {},
    trigger: 'enter train',
  },
  '4': {
    items: {
      '1': {
        title: 'find car outlet',
      },
      '2': {
        title: 'find and charge battery pack',
      },
    },
    trigger: 'backlog',
  },
  '5': {
    items: {
      '1': {
        id: '1',
        title: 'clean emails',
      },
      '2': {
        id: '2',
        title: 'clean slack',
      },
      '3': {
        id: '3',
        title: 'look at sentry',
      },
      '4': {
        id: '4',
        title: 'respond to pull requests',
      },
    },
    trigger: 'arrive at work',
  },
};
