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

interface Item {
  id: string;
  active: boolean;
  title: string;
  status: ItemStatus;
  history?: ItemHistories;
  reminder?: Reminders;
  source: Sources;
}

enum ItemStatus {
  Todo = "Todo",
  InProgress = "InProgress",
  Reminded = "Reminded",
  Done = "Done"
}

interface ItemHistory {
  id: string;
  createdAt: number;
  updatedAt: number;
  itemId: number;
  status: ItemStatus;
}

interface Checklist {
  id: string;
  item: Items;
  itemOrder: string[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  checklistOrder: string[];
  checklist: Checklists;
}

interface Reminders {
  [id: string]: Reminder;
}

interface Sources {
  [id: string]: Source;
}

interface ItemHistories {
  [id: string]: ItemHistory;
}

interface Items {
  [id: string]: Item;
}

interface Checklists {
  [id: string]: Checklist;
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
