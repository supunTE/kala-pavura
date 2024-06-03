import { z } from 'zod';

export type UserId = string;

export type User = {
  uid: UserId;
  username: string;
  email: string;
  profilePicture: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
};

export const UserSchema = z.object({
  uid: z.string(),
  username: z.string(),
  email: z.string().email(),
  profilePicture: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phoneNumber: z.string().nullable(),
});

export type ExtendedUser = User & {
  joinedAt: Date;
  lastLoginAt: Date;
};

export const ExtendedUserSchema = UserSchema.extend({
  joinedAt: z.date(),
  lastLoginAt: z.date(),
});
