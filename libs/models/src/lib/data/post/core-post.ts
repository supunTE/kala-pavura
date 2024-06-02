import { ContentTypes, StoryChapterId, StoryId } from '../content';

export type PostId = `P-${string}`;

// TODO: Include poem id
type ContextId = StoryId | StoryChapterId;

export type CorePost = {
  id: PostId;
  contentType: ContentTypes;
  contentId: ContextId;
  description: string;
  timestamps: PostTimestamps;
};

export type PostTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};
