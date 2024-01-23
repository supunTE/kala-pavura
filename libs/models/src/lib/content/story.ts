export type Story = {
  id: string;
  name: string;
  description: string;
  coverImage: StoryCoverImage;
  likes: StoryLike[];
  comments: StoryComment[];
  parts: StoryPart[];
  timestamps: StoryTimestamps;
};

type StoryCoverImage = {
  url: string;
  author: string;
  alt: string;
};

type StoryLike = {
  userId: string;
  likedAt: Date;
};

type StoryComment = {
  id: string;
  message: string;
  userId: string;
  isAuthorLiked: boolean;
};

type StoryPart = {
  index: number;
  content: StoryPartContent;
  postId: string;
};

type StoryPartContent = {
  paragraphs: string[];
};

type StoryTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};
