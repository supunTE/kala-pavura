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

export type ExtendedUser = User & {
  joinedAt: Date;
  lastLoginAt: Date;
};
