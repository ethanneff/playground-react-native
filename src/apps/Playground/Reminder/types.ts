export type ReminderType = 'one time' | 'repeat' | 'location';
export type Reminder = {
  date: number;
  format: string;
  id: string;
};
