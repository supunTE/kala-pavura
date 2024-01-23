export type CorePostContent<Context> = {
  id: string;
  context: Context;
  image: PostImage;
  likes: PostLike[];
  comments: PostComment[];
  timestamps: PostTimestamps;
};

export type PostImage = {
  url: string;
  author: string;
  alt: string;
};

export type PostLike = {
  userId: string;
  likedAt: Date;
};

export type PostComment = {
  id: string;
  message: string;
  userId: string;
};

export type PostTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};
