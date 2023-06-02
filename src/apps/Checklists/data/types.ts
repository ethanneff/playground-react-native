import { z } from 'zod';

export const userSchema = z.object({
  displayName: z.nullable(z.string()),
  email: z.nullable(z.string()),
  emailVerified: z.boolean(),
  id: z.string(),
  phoneNumber: z.nullable(z.string()),
  photoUrl: z.nullable(z.string()),
});

export type User = z.infer<typeof userSchema>;

export const checklistItemSchema = z.object({
  description: z.nullable(z.string()),
  id: z.string(),
  name: z.string(),
  userId: z.string(),
});

export type ChecklistItem = z.infer<typeof checklistItemSchema>;

export const checklistTriggerSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
});

export type ChecklistTrigger = z.infer<typeof checklistTriggerSchema>;

export const checklistItemTriggerSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  triggerId: z.string(),
  userId: z.string(),
});

export type ChecklistItemTrigger = z.infer<typeof checklistItemTriggerSchema>;

export const checklistActivitySchema = z.object({
  checklistId: z.string(),
  date: z.number(),
  id: z.string(),
  userId: z.string(),
});

export type ChecklistActivity = z.infer<typeof checklistActivitySchema>;
