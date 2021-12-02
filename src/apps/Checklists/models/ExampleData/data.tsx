interface Source {
  id: string;
  title: string;
  url: string;
}

interface Reminder {
  day: string;
  id: string;
  time: string;
}

interface Tag {
  id: string;
  name: string;
}

type ChecklistItemStatus = 'Todo' | 'InProgress' | 'Reminded' | 'Done';
export type ChecklistAccess = 'Read' | 'Write' | 'Comment';

interface ChecklistItem {
  active: boolean;
  checklistId: string;
  history?: ChecklistItemHistories;
  id: string;
  reminder?: Reminders;
  source: Sources;
  status: ChecklistItemStatus;
  title: string;
}

interface ChecklistItemHistory {
  createdAt: number;
  id: string;
  itemId: number;
  status: ChecklistItemStatus;
  updatedAt: number;
}

interface Checklist {
  completedAt: string[];
  createdAt: string;
  id: string;
  items: string[];
  tags: string[];
  updatedAt: string;
  userId: string;
  viewedAt: string[];
}

interface User {
  checklists: string[];
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

interface Reminders {
  [id: string]: Reminder;
}

interface Sources {
  [id: string]: Source;
}

interface ChecklistItemHistories {
  [id: string]: ChecklistItemHistory;
}

export interface ChecklistItems {
  [id: string]: ChecklistItem;
}

export interface Checklists {
  [id: string]: Checklist;
}

export interface Tags {
  [id: string]: Tag;
}

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
