export type KalaPavuraUser = {
  uid: string;
  username: string;
  email: string;
  profilePicture: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
};

export type KalaPavuraExtendedUser = KalaPavuraUser & {
  joinedAt: Date;
  lastLoginAt: Date;
};
