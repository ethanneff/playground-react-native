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

enum ListVisibility {
  Private = 'Private',
  Public = 'Public',
}

export enum ListAccess {
  Read = 'Read',
  Write = 'Write',
  Comment = 'Comment',
}

export enum ListFrequency {
  Single = 'Single',
  Multiple = 'Multiple',
}

export interface User {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  lists: ListId[];
}

export interface Action {
  id: ActionId;
  userId: UserId;
  listId: ListId;
  createdAt: Date;
}

export interface List {
  userId: UserId;
  name: string;
  description?: string;
  active: boolean;
  frequency: ListFrequency;
  visibility: ListVisibility;
  createdAt: Date;
  updatedAt: Date;
  item: ItemId[];
  history: ListId[];
  viewed: ActionId[];
  liked: ActionId[];
  copied: ActionId[];
  modified: ActionId[];
}

export interface Item {
  id: ItemId;
  name: string;
  description?: string;
  active: boolean;
  sources?: SourceId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Source {
  id: SourceId;
  title: string;
  url?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const a = {
  email: 'bob@gmail.com',
  lists: [
    {
      frequency: ListFrequency.Multiple,
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
      frequency: ListFrequency.Multiple,
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
      frequency: ListFrequency.Multiple,
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
      frequency: ListFrequency.Multiple,
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
      frequency: ListFrequency.Single,
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
      frequency: ListFrequency.Single,
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
