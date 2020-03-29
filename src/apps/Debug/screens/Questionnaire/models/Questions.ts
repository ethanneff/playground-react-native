import {ActionType, createAction} from 'typesafe-actions';
import {RootAction} from '../../../../../containers';

/* ACTIONS */
export const createQuestion = createAction('questions/CREATE')<Question>();
export const updateQuestion = createAction('questions/UPDATE')<Question>();
export const removeQuestion = createAction('questions/REMOVE')<string>();

/* INTERFACES */
enum QuestionType {
  Input = 'Input',
  Checkbox = 'Checkbox',
  Slider = 'Slider',
  Button = 'Button',
}

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  description?: string;
  choices: readonly string[];
}

export interface Questions {
  [id: string]: Question;
}

export type QuestionsActions = ActionType<
  typeof createQuestion | typeof updateQuestion | typeof removeQuestion
>;

/* REDUCERS */
export const questionsInitialState: Questions = {
  '1': {
    choices: ['4', '5', '6'],
    id: '1',
    title: 'what type of counseling are you looking for?',
    type: QuestionType.Checkbox,
  },
  '10': {
    choices: ['241', '242', '238', '243', '244'],
    id: '10',
    title:
      'I think that I would need the support of a technical person to be able to use this system.',
    type: QuestionType.Button,
  },
  '2': {
    choices: ['1', '2', '3'],
    id: '2',
    title: 'what is your gender?',
    type: QuestionType.Button,
  },
  '3': {
    choices: ['32', '33', '34'],
    id: '3',
    title: 'how old are you?',
    type: QuestionType.Slider,
  },
  '4': {
    choices: ['10', '11', '12'],
    id: '4',
    title: 'where do you live?',
    type: QuestionType.Button,
  },
  '5': {
    choices: ['234'],
    id: '5',
    title: "How's life",
    type: QuestionType.Input,
  },
  '6': {
    choices: ['236', '237', '238', '239', '240'],
    id: '5',
    title: 'How satisfied are you with our service?',
    type: QuestionType.Button,
  },
  '7': {
    choices: ['241', '242', '238', '243', '244'],
    id: '7',
    title: 'I think that I would like to use this system frequently.',
    type: QuestionType.Button,
  },
  '8': {
    choices: ['241', '242', '238', '243', '244'],
    id: '8',
    title: 'I found the system unnecessarily complex.',
    type: QuestionType.Button,
  },
  '9': {
    choices: ['241', '242', '238', '243', '244'],
    id: '9',
    title: 'I thought the system was easy to use.',
    type: QuestionType.Button,
  },

  '11': {
    choices: ['241', '242', '238', '243', '244'],
    id: '11',
    title: 'I found the various functions in this system were well integrated.',
    type: QuestionType.Button,
  },
  '12': {
    choices: ['241', '242', '238', '243', '244'],
    id: '12',
    title: 'I thought there was too much inconsistency in this system.',
    type: QuestionType.Button,
  },
  '13': {
    choices: ['241', '242', '238', '243', '244'],
    id: '13',
    title:
      'I would imagine that most people would learn to use this system very quickly.',
    type: QuestionType.Button,
  },
  '14': {
    choices: ['241', '242', '238', '243', '244'],
    id: '14',
    title: 'I found the system very cumbersome to use.',
    type: QuestionType.Button,
  },
  '15': {
    choices: ['241', '242', '238', '243', '244'],
    id: '15',
    title: 'I felt very confident using the system.',
    type: QuestionType.Button,
  },
  '16': {
    choices: ['241', '242', '238', '243', '244'],
    id: '16',
    title:
      'I needed to learn a lot of things before I could get going with this system.',
    type: QuestionType.Button,
  },
  '17': {
    choices: [
      '235',
      '032',
      '033',
      '034',
      '035',
      '036',
      '037',
      '038',
      '039',
      '040',
      '041',
    ],
    id: '17',
    title: 'How likely are you to recommend us to a friend or colleague?',
    type: QuestionType.Button,
  },
  '18': {
    choices: [],
    id: '18',
    title: 'What is the primary reason fro your score?',
    type: QuestionType.Input,
  },
};

export function questionsReducer(
  state: Questions = questionsInitialState,
  action: RootAction,
): Questions {
  switch (action.type) {
    default:
      return state;
  }
}
