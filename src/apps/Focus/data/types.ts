import { z } from 'zod';

export const userSchema = z.object({
  displayName: z.nullable(z.string()),
  email: z.nullable(z.string()),
  phoneNumber: z.nullable(z.string()),
  photoUrl: z.nullable(z.string()),
  emailVerified: z.boolean(),
  id: z.string(),
});

export const preferenceSchema = z.object({
  availability: z.string(), // 96 number based on 15min intervals
  theme: z.union([z.literal('dark'), z.literal('light')]),
  notifications: z.array(
    z.union([z.literal('email'), z.literal('mobile'), z.literal('web')]),
  ),
  cadence: z.union([
    z.literal(30),
    z.literal(60),
    z.literal(120),
    z.literal(240),
    z.literal(480),
    z.literal(720),
    z.literal(1440),
  ]),
  uid: z.string(),
  timezone: z.string(),
  id: z.string().optional(),
});

export const intervalSchema = z.object({
  uid: z.string(),
  id: z.string().optional(),
  name: z.string(),
});

export const goalSchema = z.object({
  uid: z.string(),
  active: z.boolean(),
  id: z.string().optional(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Preferences = z.infer<typeof preferenceSchema>;
export type Interval = z.infer<typeof intervalSchema>;
export type Goal = z.infer<typeof goalSchema>;
