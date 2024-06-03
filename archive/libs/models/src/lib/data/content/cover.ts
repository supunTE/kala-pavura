export type CoverImage = {
  url: string;
  imageAuthor: string;
  alt: string;
};

export type CoverLike = {
  userId: string;
  likedAt: Date;
};

export type CoverComment = {
  id: string;
  message: string;
  userId: string;
};

type CoverTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type CoverData = {
  image: CoverImage;
  likes: CoverLike[];
  likesCount: number;
  comments: CoverComment[];
  commentsCount: number;
  timestamps: CoverTimestamps;
};
