export enum ImageSource {
  Unsplash = 'unsplash',
  Upload = 'upload',
}

export type CoverImage = {
  id: string;
  thumbnail: string;
  small: string;
  regular: string;
  imageAuthor: string;
  alt: string;
  source: ImageSource;
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
