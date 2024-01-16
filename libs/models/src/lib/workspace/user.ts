export type KalaPavuraUser = {
  uid: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string | null;
  phoneNumber: string | null;
  profilePicture: string;
};

export type KalaPavuraExtendedUser = KalaPavuraUser & {
  joinedAt: Date;
  lastLoginAt: Date;
};
