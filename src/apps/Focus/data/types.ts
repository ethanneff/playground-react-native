import { z } from 'zod';

export const userSchema = z.object({
  displayName: z.nullable(z.string()),
  email: z.nullable(z.string()),
  emailVerified: z.boolean(),
  id: z.string(),
  phoneNumber: z.nullable(z.string()),
  photoUrl: z.nullable(z.string()),
});

export const preferenceSchema = z.object({
  availability: z.string(),
  cadence: z.union([
    z.literal(30),
    z.literal(60),
    z.literal(120),
    z.literal(240),
    z.literal(480),
    z.literal(720),
    z.literal(1440),
  ]),

  id: z.string().optional(),

  notifications: z.array(
    z.union([z.literal('email'), z.literal('mobile'), z.literal('web')]),
  ),
  // 96 number based on 15min intervals
  theme: z.union([z.literal('dark'), z.literal('light')]),
  timezone: z.string(),
  uid: z.string(),
});

export const intervalSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  uid: z.string(),
});

export const goalSchema = z.object({
  active: z.boolean(),
  id: z.string().optional(),
  name: z.string(),
  uid: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Preferences = z.infer<typeof preferenceSchema>;
export type Interval = z.infer<typeof intervalSchema>;
export type Goal = z.infer<typeof goalSchema>;
