// why checklist https://www.youtube.com/watch?v=18ns58FyPmY high quality work
// 5 to 9 killer items
// field tested and updated

// user
// list
// list item
// list item add
// list item remove
// list item complete
// list history
// list item relocate
// list frequency
// list visibility
// list search
// list copy
// list modify
// list metrics (viewed, liked, copied, modified, completed)

/*
graph TD

user1-->|owns|list1
user2-->|owns|list2
user3-->|owns|list3

list1-->listItems1
list1-->listHistories1
listItems1-->item1
listItems1-->item2
listItems1-->item3
listHistories1-->listHistory1
listHistories1-->listHistory2
listHistories1-->listHistory3

list2-->|copied|list1
list2-->listItems2
list2-->listHistories2
listItems2-->item4
listItems2-->item5
listItems2-->item6
listHistories2-->listHistory4
listHistories2-->listHistory5
listHistories2-->listHistory6

list3-->|modified|list1
list3-->listItems3
list3-->listHistories3
listItems3-->item7
listItems3-->item8
listItems3-->item9
listItems3-->item10
listHistories3-->listHistory7
listHistories3-->listHistory8
listHistories3-->listHistory9
listHistories3-->listHistory10

subgraph one
item10
end
*/

type Date = number; // (new Date).getTime()/1000
type UserId = string; // uuid/v4
type ListId = string;
type ItemId = string;
type SourceId = string;
type ActionId = string;

type ListVisibility = 'Private' | 'Public';

export type ListAccess = 'Read' | 'Write' | 'Comment';

export type ListFrequency = 'Single' | 'Multiple';

export interface User {
  email: string;
  firstName: string;
  id: UserId;
  lastName: string;
  lists: ListId[];
}

export interface Action {
  createdAt: Date;
  id: ActionId;
  listId: ListId;
  userId: UserId;
}

export interface List {
  active: boolean;
  copied: ActionId[];
  createdAt: Date;
  description?: string;
  frequency: ListFrequency;
  history: ListId[];
  item: ItemId[];
  liked: ActionId[];
  modified: ActionId[];
  name: string;
  updatedAt: Date;
  userId: UserId;
  viewed: ActionId[];
  visibility: ListVisibility;
}

export interface Item {
  active: boolean;
  createdAt: Date;
  description?: string;
  id: ItemId;
  name: string;
  sources?: SourceId[];
  updatedAt: Date;
}

export interface Source {
  createdAt: Date;
  id: SourceId;
  image?: string;
  title: string;
  updatedAt: Date;
  url?: string;
}

export const a = {
  email: 'bob@gmail.com',
  lists: [
    {
      frequency: 'Multiple',
      history: [],
      items: [
        'Make bold deadlines and commitments',
        'Get out of comfort zone',
        'Split tasks to emergent vs planned work',
        'Do fear setting by Tim ferris',
        'Block out calendar for emails',
        'Make biweekly meeting to clean self',
      ],
      trigger: 'accomplish things',
    },
    {
      frequency: 'Multiple',
      items: [
        'Make your bed',
        'Take a cold shower',
        'Journal on paper and make checklists',
        'Medication',
        'Practice gratitude',
      ],
      trigger: 'wake up',
    },
    {
      frequency: 'Multiple',
      items: [
        'make overnight oats',
        'floss',
        'brush teeth',
        'rogaine',
        'plan tomorrow',
      ],
      trigger: 'go to sleep',
    },
    {
      frequency: 'Multiple',
      items: [
        // https://www.youtube.com/watch?v=sWctLEdIgi4
        'develop a fascination',
        'seek daily improvements (beat yourself)',
        'understand the greater purpose',
        'develop a growth mindset',
      ],
      trigger: 'begin a task',
    },
    {
      frequency: 'Single',
      // done = complete forever
      items: [
        'find clothing',
        'buy superglue',
        'buy boba ingredients',
        'shop at uniqlo',
      ],
      trigger: 'running errands',
    },
    {
      frequency: 'Single',
      // done = complete forever
      items: [
        'whiten teeth',
        'Fix jackets',
        'demotologist',
        'dear up tasks',
        'calendar on phone',
        'find spit',
        'share photos will mom',
        'phillipean flights',
        'migrate off notion.so',
        'make boba',
        'shop at uniqlo',
        'respond to john',
        'resume out for 175',
        'upload Images to shutterstock',
        'look up tradeshows',
        'learn fortnite dances',
        'expense wireframing app',
        'expense amazon kindle unlimited',
      ],
      trigger: 'find downtime (backlog)',
    },
  ],
  user: 'bob',
};
