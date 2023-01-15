export type ReminderType = 'location' | 'one time' | 'repeat';
export type Reminder = {
  date: number;
  format: string;
  id: string;
};
