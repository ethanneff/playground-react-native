export type ReminderType = 'one time' | 'repeat' | 'location';
export type Reminder = {
  id: string;
  date: number;
  format: string;
};
