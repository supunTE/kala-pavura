import { UserId } from '@kala-pavura/models';

import { PostId, StoryChapterId, StoryId } from '../data';

export type GroupId = `G-${string}`;

export type Group = {
  id: GroupId;
  name: string;
  description: string;
  userIds: UserId[];
  adminIds: UserId[];
  ownerId: UserId;
  pendingContent: {
    stories: StoryId[];
    storyChapters: StoryChapterId[];
    posts: PostId[];
  };
  reviewedContent: {
    stories: StoryId[];
    storyChapters: StoryChapterId[];
    posts: PostId[];
  };
};
