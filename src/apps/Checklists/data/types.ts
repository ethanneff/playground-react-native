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
