import { StoryChapterId, StoryId } from '../content/story';

export type PostId = `P-${string}`;

export enum PostContextTypes {
  Story = 'STORY',
  StoryChapter = 'STORY_CHAPTER',
  Poem = 'POEM',
}

// TODO: Include poem id
type ContextId = StoryId | StoryChapterId;

export type CorePost = {
  id: PostId;
  contextType: PostContextTypes;
  contextId: ContextId;
  description: string;
  timestamps: PostTimestamps;
};

export type PostTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};
