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

type ChecklistItemStatus = 'Todo' | 'InProgress' | 'Reminded' | 'Done';

type ChecklistItemHistory = {
  createdAt: number;
  id: string;
  itemId: number;
  status: ChecklistItemStatus;
  updatedAt: number;
};

type ChecklistItemHistories = {
  [id: string]: ChecklistItemHistory;
};

type Reminders = {
  [id: string]: Reminder;
};

type Sources = {
  [id: string]: Source;
};

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

export type ChecklistItems = {
  [id: string]: ChecklistItem;
};

export type Checklists = {
  [id: string]: Checklist;
};

export type Tags = {
  [id: string]: Tag;
};

export const user: User = {
  id: '123',
  firstName: 'bob',
  lastName: 'smith',
  email: 'bob.smith@email.com',
  checklists: [],
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
