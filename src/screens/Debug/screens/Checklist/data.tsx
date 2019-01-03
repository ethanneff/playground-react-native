interface Source {
  id: string;
  title: string;
  url: string;
}

interface Reminder {
  id: string;
  day: string; // ?
  time: string; // ?
}

interface Tag {
  id: string;
  name: string;
}

export enum ChecklistAccess {
  Read = "Read",
  Write = "Write",
  Comment = "Comment"
}

interface ChecklistItem {
  id: string;
  checklistId: string;
  active: boolean;
  title: string;
  status: ChecklistItemStatus;
  history?: ChecklistItemHistories;
  reminder?: Reminders;
  source: Sources;
}

enum ChecklistItemStatus {
  Todo = "Todo",
  InProgress = "InProgress",
  Reminded = "Reminded",
  Done = "Done"
}

interface ChecklistItemHistory {
  id: string;
  createdAt: number;
  updatedAt: number;
  itemId: number;
  status: ChecklistItemStatus;
}

interface Checklist {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  viewedAt: string[];
  completedAt: string[];
  items: string[];
  tags: string[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  checklists: string[];
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

export const User: User | any = {};

export const Data = {
  "4": {
    trigger: "backlog",
    items: {
      "1": {
        title: "find car outlet"
      },
      "2": {
        title: "find and charge battery pack"
      }
    }
  },
  "3": {
    trigger: "enter train",
    reminders: {},
    items: {
      "1": {
        title: "read",
        sources: {}
      },
      "2": {
        title: "remove teeth"
      }
    }
  },
  "5": {
    trigger: "arrive at work",
    items: {
      "1": {
        id: "1",
        title: "clean emails"
      },
      "2": {
        id: "2",
        title: "clean slack"
      },
      "3": {
        id: "3",
        title: "look at sentry"
      },
      "4": {
        id: "4",
        title: "respond to pull requests"
      }
    }
  }
};
